"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Event } from "@prisma/client";
import { deleteEvent } from "./actions";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";

const TARGET_LABELS = {
    all: "Tout le monde",
    subscribers: "Membres du club",
    visitors: "Visiteurs",
};

const TARGET_STYLES = {
    all: "bg-zinc-100 text-zinc-700",
    subscribers: "bg-amas-orange/20 text-navbar-bg",
    visitors: "bg-blue-100 text-blue-700",
};

type Props = {
    events: Event[];
    currentPage: number;
    totalPages: number;
};

export default function EventsTable({ events, currentPage, totalPages }: Props) {
    const router = useRouter();
    const [addOpen, setAddOpen] = useState(false);
    const [editEvent, setEditEvent] = useState<Event | null>(null);

    async function handleDelete(id: string, title: string) {
        if (!confirm(`Supprimer "${title}" et toutes ses inscriptions ?`)) return;
        await deleteEvent(id);
        router.refresh();
    }

    function goToPage(page: number) {
        router.push(`?page=${page}`);
    }

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-black uppercase">Agenda</h1>
                <button
                    onClick={() => setAddOpen(true)}
                    className="px-6 py-3 bg-black text-white rounded-full font-black uppercase text-sm hover:bg-amas-orange transition-all"
                >
                    + Créer un événement
                </button>
            </div>

            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Titre</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Lieu</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Audience</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 font-bold">
                                    Aucun événement pour l&apos;instant
                                </td>
                            </tr>
                        ) : (
                            events.map((event) => (
                                <tr key={event.id} className="border-t border-zinc-100 hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4 font-bold">{event.title}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600">
                                        {new Date(event.date).toLocaleDateString("fr-FR", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-600">{event.location}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${TARGET_STYLES[event.target]}`}>
                                            {TARGET_LABELS[event.target]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/agenda/${event.id}`}
                                                className="px-3 py-1 text-xs font-black uppercase border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                                            >
                                                Détail
                                            </Link>
                                            <button
                                                onClick={() => setEditEvent(event)}
                                                className="px-3 py-1 text-xs font-black uppercase border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event.id, event.title)}
                                                className="px-3 py-1 text-xs font-black uppercase border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-full border-2 border-black font-black text-sm uppercase hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        ← Précédent
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-10 h-10 rounded-full border-2 border-black font-black text-sm transition-all ${
                                page === currentPage ? "bg-black text-white" : "hover:bg-zinc-100"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-full border-2 border-black font-black text-sm uppercase hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Suivant →
                    </button>
                </div>
            )}

            {addOpen && <AddEventModal onClose={() => setAddOpen(false)} />}
            {editEvent && <EditEventModal event={editEvent} onClose={() => setEditEvent(null)} />}
        </>
    );
}
