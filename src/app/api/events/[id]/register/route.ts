import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json();
    const { firstName, lastName, email, phone } = body;

    if (!firstName || !lastName || !email || !phone) {
        return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
    }

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
        return NextResponse.json({ error: "Événement introuvable." }, { status: 404 });
    }

    if (event.target === "subscribers") {
        const member = await prisma.memberClub.findFirst({
            where: {
                email: { equals: email, mode: "insensitive" },
                firstName: { equals: firstName, mode: "insensitive" },
                lastName: { equals: lastName, mode: "insensitive" },
            },
        });
        if (!member) {
            return NextResponse.json(
                { error: "Cet événement est réservé aux membres du club. Vos informations ne correspondent à aucun membre enregistré." },
                { status: 403 }
            );
        }
    }

    const alreadyRegistered = await prisma.registration.findFirst({
        where: { eventId: id, email: { equals: email, mode: "insensitive" } },
    });
    if (alreadyRegistered) {
        return NextResponse.json({ error: "Vous êtes déjà inscrit à cet événement." }, { status: 409 });
    }

    await prisma.registration.create({
        data: { eventId: id, firstName, lastName, email, phone },
    });

    return NextResponse.json({ success: true }, { status: 201 });
}
