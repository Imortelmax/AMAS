import { NextRequest, NextResponse } from "next/server";
import { ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@/lib/r2";
import { prisma } from "@/lib/db";

export const maxDuration = 60;

function keyFromUrl(url: string): string | null {
    if (!url || !R2_PUBLIC_URL) return null;
    const prefix = R2_PUBLIC_URL.endsWith("/") ? R2_PUBLIC_URL : `${R2_PUBLIC_URL}/`;
    if (!url.startsWith(prefix)) return null;
    return url.slice(prefix.length);
}

async function listAllR2Keys(): Promise<string[]> {
    const keys: string[] = [];
    let continuationToken: string | undefined;

    do {
        const response = await r2.send(
            new ListObjectsV2Command({
                Bucket: R2_BUCKET,
                ContinuationToken: continuationToken,
            })
        );
        for (const obj of response.Contents ?? []) {
            if (obj.Key) keys.push(obj.Key);
        }
        continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    return keys;
}

async function getUsedKeys(): Promise<Set<string>> {
    const [articleImages, articleVideos, motoImages, members, events] = await Promise.all([
        prisma.articleImage.findMany({ select: { url: true } }),
        prisma.articleVideo.findMany({ select: { url: true } }),
        prisma.motoImage.findMany({ select: { url: true } }),
        prisma.member.findMany({ select: { imageUrl: true } }),
        prisma.event.findMany({ select: { fileUrl: true } }),
    ]);

    const usedKeys = new Set<string>();

    const allUrls = [
        ...articleImages.map((r) => r.url),
        ...articleVideos.map((r) => r.url),
        ...motoImages.map((r) => r.url),
        ...members.map((r) => r.imageUrl),
        ...events.flatMap((r) => (r.fileUrl ? [r.fileUrl] : [])),
    ];

    for (const url of allUrls) {
        const key = keyFromUrl(url);
        if (key) usedKeys.add(key);
    }

    return usedKeys;
}

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dryRun = req.nextUrl.searchParams.get("dry_run") === "true";

    const [allKeys, usedKeys] = await Promise.all([listAllR2Keys(), getUsedKeys()]);

    const orphanKeys = allKeys.filter((key) => !usedKeys.has(key));

    if (orphanKeys.length === 0) {
        return NextResponse.json({ deleted: 0, message: "Aucun fichier orphelin trouvé" });
    }

    if (dryRun) {
        return NextResponse.json({ dryRun: true, orphanKeys, count: orphanKeys.length });
    }

    // Delete in batches of 1000 (S3 API limit)
    let totalDeleted = 0;
    for (let i = 0; i < orphanKeys.length; i += 1000) {
        const batch = orphanKeys.slice(i, i + 1000);
        await r2.send(
            new DeleteObjectsCommand({
                Bucket: R2_BUCKET,
                Delete: { Objects: batch.map((Key) => ({ Key })) },
            })
        );
        totalDeleted += batch.length;
    }

    console.log(`[cleanup-r2] Supprimé ${totalDeleted} fichiers orphelins`);

    return NextResponse.json({ deleted: totalDeleted, orphanKeys });
}
