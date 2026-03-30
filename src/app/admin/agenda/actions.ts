"use server";

import { prisma } from "@/lib/db";
import { TargetAudience } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addEvent(formData: FormData) {
    await prisma.event.create({
        data: {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            date: new Date(formData.get("date") as string),
            location: formData.get("location") as string,
            target: formData.get("target") as TargetAudience,
        },
    });
    revalidatePath("/admin/agenda");
}

export async function updateEvent(id: string, formData: FormData) {
    await prisma.event.update({
        where: { id },
        data: {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            date: new Date(formData.get("date") as string),
            location: formData.get("location") as string,
            target: formData.get("target") as TargetAudience,
        },
    });
    revalidatePath("/admin/agenda");
    revalidatePath(`/admin/agenda/${id}`);
}

export async function deleteEvent(id: string) {
    await prisma.registration.deleteMany({ where: { eventId: id } });
    await prisma.event.delete({ where: { id } });
    revalidatePath("/admin/agenda");
}
