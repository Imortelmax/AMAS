"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MemberClub } from "@/types";
import { deleteMember } from "./actions";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";

type Props = {
    members: MemberClub[];
    currentPage: number;
    totalPages: number;
};

export default function MembersTable({ members, currentPage, totalPages }: Props) {
    const router = useRouter();
    const [addOpen, setAddOpen] = useState(false);
    const [editMember, setEditMember] = useState<MemberClub | null>(null);

    async function handleDelete(id: string, name: string) {
        if (!confirm(`Supprimer ${name} ?`)) return;
        await deleteMember(id);
        router.refresh();
    }

    function goToPage(page: number) {
        router.push(`?page=${page}`);
    }

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-black uppercase">Membres du Club</h1>
                <button
                    onClick={() => setAddOpen(true)}
                    className="px-6 py-3 bg-black text-white rounded-full font-black uppercase text-sm hover:bg-amas-orange transition-all"
                >
                    + Ajouter
                </button>
            </div>

            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">#</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Nom</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Téléphone</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Inscription</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-zinc-400 font-bold">
                                    Aucun membre pour l&apos;instant
                                </td>
                            </tr>
                        ) : (
                            members.map((member, index) => (
                                <tr key={member.id} className="border-t border-zinc-100 hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-zinc-400">
                                        {(currentPage - 1) * 10 + index + 1}
                                    </td>
                                    <td className="px-6 py-4 font-bold">
                                        {member.firstName} {member.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-600">{member.email}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600">{member.phone}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-400">
                                        {member.createdAt.toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditMember(member)}
                                                className="px-3 py-1 text-xs font-black uppercase border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(member.id, `${member.firstName} ${member.lastName}`)}
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

            {addOpen && <AddMemberModal onClose={() => setAddOpen(false)} />}
            {editMember && <EditMemberModal member={editMember} onClose={() => setEditMember(null)} />}
        </>
    );
}
