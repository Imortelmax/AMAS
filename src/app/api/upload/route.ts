import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, R2_BUCKET } from "@/lib/r2";
import { auth } from "@/auth";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
    "application/pdf",
];

const MAX_SIZE = 100 * 1024 * 1024; // 100 MB

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filename, contentType, size, folder } = await req.json();

    if (!ALLOWED_TYPES.includes(contentType)) {
        return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 });
    }

    if (size > MAX_SIZE) {
        return NextResponse.json({ error: "Fichier trop volumineux (max 100 MB)" }, { status: 400 });
    }

    const ext = filename.split(".").pop();
    const key = `${folder}/${randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        ContentType: contentType,
        ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(r2, command, { expiresIn: 300 });

    return NextResponse.json({
        presignedUrl,
        publicUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`,
    });
}
