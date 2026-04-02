"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addMoto(formData: FormData) {
    const imageUrls = formData.getAll("imageUrl") as string[];

    await prisma.moto.create({
        data: {
            model: formData.get("model") as string,
            year: parseInt(formData.get("year") as string),
            description: formData.get("description") as string,
            images: {
                create: imageUrls.filter(Boolean).map((url) => ({ url })),
            },
        },
    });
    revalidatePath("/admin/motos");
    revalidatePath("/moto");
}

export async function updateMoto(id: string, formData: FormData) {
    const imageUrls = formData.getAll("imageUrl") as string[];

    await prisma.$transaction([
        prisma.motoImage.deleteMany({ where: { motoId: id } }),
        prisma.moto.update({
            where: { id },
            data: {
                model: formData.get("model") as string,
                year: parseInt(formData.get("year") as string),
                description: formData.get("description") as string,
                images: {
                    create: imageUrls.filter(Boolean).map((url) => ({ url })),
                },
            },
        }),
    ]);
    revalidatePath("/admin/motos");
    revalidatePath("/moto");
}

export async function deleteMoto(id: string) {
    await prisma.motoImage.deleteMany({ where: { motoId: id } });
    await prisma.moto.delete({ where: { id } });
    revalidatePath("/admin/motos");
    revalidatePath("/moto");
}
