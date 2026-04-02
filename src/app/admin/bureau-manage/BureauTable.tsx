"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Member } from "@prisma/client";
import type { MemberRole } from "@/types";
import { deleteBureauMember } from "./actions";
import BureauModal from "./BureauModal";

const ROLE_LABELS: Record<MemberRole, string> = {
    president: "Président",
    vice_president: "Vice-Président",
    secretaire: "Secrétaire",
    tresorier: "Trésorier",
    technique: "Référent Technique",
    communication: "Communication",
};

export default function BureauTable({ members }: { members: Member[] }) {
    const router = useRouter();
    const [addOpen, setAddOpen] = useState(false);
    const [editMember, setEditMember] = useState<Member | null>(null);

    async function handleDelete(id: string, name: string) {
        if (!confirm(`Supprimer ${name} du bureau ?`)) return;
        await deleteBureauMember(id);
        router.refresh();
    }

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-black uppercase">Bureau</h1>
                <button
                    onClick={() => setAddOpen(true)}
                    className="px-6 py-3 bg-black text-white rounded-full font-black uppercase text-sm hover:bg-amas-orange transition-all"
                >
                    + Ajouter un membre
                </button>
            </div>

            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Photo</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Nom</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Rôle(s)</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Téléphone</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 font-bold">
                                    Aucun membre dans le bureau
                                </td>
                            </tr>
                        ) : (
                            members.map((member) => (
                                <tr key={member.id} className="border-t border-zinc-100 hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black">
                                            <Image src={member.imageUrl} alt={member.firstname} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold">
                                        {member.firstname} {member.lastname}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {member.role.map((r) => (
                                                <span key={r} className="px-2 py-1 bg-amas-orange/20 text-navbar-bg rounded-full text-xs font-black uppercase">
                                                    {ROLE_LABELS[r]}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-600">{member.phone}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditMember(member)}
                                                className="px-3 py-1 text-xs font-black uppercase border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(member.id, `${member.firstname} ${member.lastname}`)}
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

            {addOpen && <BureauModal onClose={() => setAddOpen(false)} />}
            {editMember && <BureauModal member={editMember} onClose={() => setEditMember(null)} />}
        </>
    );
}
