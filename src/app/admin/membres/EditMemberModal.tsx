"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateMember } from "./actions";
import type { MemberClub } from "@/types";

export default function EditMemberModal({ member, onClose }: { member: MemberClub; onClose: () => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateMemberById = updateMember.bind(null, member.id);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        try {
            await updateMemberById(formData);
            router.refresh();
            onClose();
        } catch {
            setError("Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-2xl w-full max-w-md mx-4">
                <h2 className="text-2xl font-black uppercase mb-6">Modifier le membre</h2>
                <form action={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Prénom</label>
                            <input name="firstName" defaultValue={member.firstName} required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Nom</label>
                            <input name="lastName" defaultValue={member.lastName} required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Email</label>
                        <input name="email" type="email" defaultValue={member.email} required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Téléphone</label>
                        <input name="phone" type="tel" defaultValue={member.phone} required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                    </div>
                    {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full border-2 border-black font-black uppercase hover:bg-zinc-100 transition-all">
                            Annuler
                        </button>
                        <button type="submit" disabled={loading} className="flex-1 py-3 rounded-full bg-black text-white font-black uppercase hover:bg-amas-orange transition-all disabled:bg-zinc-400">
                            {loading ? "Sauvegarde..." : "Enregistrer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
