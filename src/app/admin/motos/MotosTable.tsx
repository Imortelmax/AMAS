"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Moto, MotoImage } from "@/types";
import { deleteMoto } from "./actions";
import MotoModal from "./MotoModal";

type MotoWithImages = Moto & { images: MotoImage[] };

type Props = {
    motos: MotoWithImages[];
    currentPage: number;
    totalPages: number;
};

export default function MotosTable({ motos, currentPage, totalPages }: Props) {
    const router = useRouter();
    const [addOpen, setAddOpen] = useState(false);
    const [editMoto, setEditMoto] = useState<MotoWithImages | null>(null);

    async function handleDelete(id: string, model: string) {
        if (!confirm(`Supprimer "${model}" ?`)) return;
        await deleteMoto(id);
        router.refresh();
    }

    function goToPage(page: number) {
        router.push(`?page=${page}`);
    }

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-black uppercase">Motos</h1>
                <button
                    onClick={() => setAddOpen(true)}
                    className="px-6 py-3 bg-black text-white rounded-full font-black uppercase text-sm hover:bg-amas-orange transition-all"
                >
                    + Ajouter une moto
                </button>
            </div>

            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Photo</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Modèle</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Année</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Description</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Photos</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {motos.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-zinc-400 font-bold">
                                    Aucune moto pour l&apos;instant
                                </td>
                            </tr>
                        ) : (
                            motos.map((moto) => (
                                <tr key={moto.id} className="border-t border-zinc-100 hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4">
                                        {moto.images[0] ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={moto.images[0].url}
                                                alt={moto.model}
                                                className="w-16 h-12 object-cover rounded-lg border-2 border-zinc-200"
                                            />
                                        ) : (
                                            <div className="w-16 h-12 rounded-lg bg-zinc-100 border-2 border-zinc-200 flex items-center justify-center text-zinc-300 text-xs">
                                                —
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-bold">{moto.model}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600">{moto.year}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600 max-w-xs truncate">{moto.description}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-500 font-bold">
                                        {moto.images.length} photo{moto.images.length !== 1 ? "s" : ""}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditMoto(moto)}
                                                className="px-3 py-1 text-xs font-black uppercase border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(moto.id, moto.model)}
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

            {addOpen && <MotoModal onClose={() => setAddOpen(false)} />}
            {editMoto && <MotoModal moto={editMoto} onClose={() => setEditMoto(null)} />}
        </>
    );
}
