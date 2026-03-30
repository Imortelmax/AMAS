"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addMember(formData: FormData) {
    await prisma.memberClub.create({
        data: {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
        },
    });
    revalidatePath("/admin/membres");
}

export async function updateMember(id: string, formData: FormData) {
    await prisma.memberClub.update({
        where: { id },
        data: {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
        },
    });
    revalidatePath("/admin/membres");
}

export async function deleteMember(id: string) {
    await prisma.memberClub.delete({ where: { id } });
    revalidatePath("/admin/membres");
}
