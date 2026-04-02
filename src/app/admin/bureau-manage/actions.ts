"use server";

import { prisma } from "@/lib/db";
import type { MemberRole } from "@/types";
import { revalidatePath } from "next/cache";

export async function addBureauMember(formData: FormData) {
    const roles = formData.getAll("role") as MemberRole[];

    await prisma.member.create({
        data: {
            firstname: formData.get("firstname") as string,
            lastname: formData.get("lastname") as string,
            phone: formData.get("phone") as string,
            imageUrl: formData.get("imageUrl") as string,
            role: roles,
        },
    });
    revalidatePath("/admin/bureau-manage");
    revalidatePath("/bureau");
}

export async function updateBureauMember(id: string, formData: FormData) {
    const roles = formData.getAll("role") as MemberRole[];

    await prisma.member.update({
        where: { id },
        data: {
            firstname: formData.get("firstname") as string,
            lastname: formData.get("lastname") as string,
            phone: formData.get("phone") as string,
            imageUrl: formData.get("imageUrl") as string,
            role: roles,
        },
    });
    revalidatePath("/admin/bureau-manage");
    revalidatePath("/bureau");
}

export async function deleteBureauMember(id: string) {
    await prisma.member.delete({ where: { id } });
    revalidatePath("/admin/bureau-manage");
    revalidatePath("/bureau");
}
