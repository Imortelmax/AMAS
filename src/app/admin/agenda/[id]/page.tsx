import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { TargetAudience } from "@/types";

const TARGET_LABELS: Record<TargetAudience, string> = {
    all: "Tout le monde",
    subscribers: "Membres du club",
    visitors: "Visiteurs",
};

type Registration = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: Date;
};

type EventWithRegistrations = {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    target: string;
    registrations: Registration[];
};

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            registrations: {
                orderBy: { createdAt: "asc" },
            },
        },
    }) as EventWithRegistrations | null;

    if (!event) notFound();

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/agenda"
                    className="px-4 py-2 rounded-full border-2 border-black font-black text-sm uppercase hover:bg-black hover:text-white transition-all"
                >
                    ← Retour
                </Link>
                <h1 className="text-4xl font-black uppercase">{event.title}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-2xl border-2 border-zinc-200">
                    <p className="text-xs font-black uppercase text-zinc-400 mb-1">Date</p>
                    <p className="font-bold">
                        {new Date(event.date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-2 border-zinc-200">
                    <p className="text-xs font-black uppercase text-zinc-400 mb-1">Lieu</p>
                    <p className="font-bold">{event.location}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-2 border-zinc-200">
                    <p className="text-xs font-black uppercase text-zinc-400 mb-1">Audience</p>
                    <p className="font-bold">{TARGET_LABELS[event.target as TargetAudience]}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-zinc-200 mb-8">
                <p className="text-xs font-black uppercase text-zinc-400 mb-2">Description</p>
                <p className="text-zinc-700">{event.description}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black uppercase">
                    Inscrits
                    <span className="ml-3 text-amas-orange">{event.registrations.length}</span>
                </h2>
            </div>

            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">#</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Nom</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Téléphone</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Inscrit le</th>
                        </tr>
                    </thead>
                    <tbody>
                        {event.registrations.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 font-bold">
                                    Aucune inscription pour cet événement
                                </td>
                            </tr>
                        ) : (
                            event.registrations.map((reg, index) => (
                                <tr key={reg.id} className="border-t border-zinc-100 hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-zinc-400">{index + 1}</td>
                                    <td className="px-6 py-4 font-bold">{reg.firstName} {reg.lastName}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600">{reg.email}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600">{reg.phone}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-400">
                                        {reg.createdAt.toLocaleDateString("fr-FR")}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
