"use server";

import { prisma } from "@/lib/db";
import { ArticleType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addArticle(formData: FormData) {
    const imageUrls = formData.getAll("imageUrl") as string[];

    await prisma.article.create({
        data: {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            type: formData.get("type") as ArticleType,
            published: formData.get("published") === "true",
            imageUrl: {
                create: imageUrls.filter(Boolean).map((url) => ({ url })),
            },
        },
    });
    revalidatePath("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
    const imageUrls = formData.getAll("imageUrl") as string[];

    await prisma.$transaction([
        prisma.articleImage.deleteMany({ where: { articleId: id } }),
        prisma.article.update({
            where: { id },
            data: {
                title: formData.get("title") as string,
                content: formData.get("content") as string,
                type: formData.get("type") as ArticleType,
                published: formData.get("published") === "true",
                imageUrl: {
                    create: imageUrls.filter(Boolean).map((url) => ({ url })),
                },
            },
        }),
    ]);
    revalidatePath("/admin/articles");
}

export async function deleteArticle(id: string) {
    await prisma.articleImage.deleteMany({ where: { articleId: id } });
    await prisma.article.delete({ where: { id } });
    revalidatePath("/admin/articles");
}

export async function togglePublished(id: string, published: boolean) {
    await prisma.article.update({
        where: { id },
        data: { published },
    });
    revalidatePath("/admin/articles");
}
