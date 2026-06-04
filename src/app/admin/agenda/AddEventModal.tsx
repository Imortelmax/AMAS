"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addEvent } from "./actions";
import FileUpload from "@/components/shared/FileUpload";
import { R2_FOLDERS } from "@/lib/r2";

export default function AddEventModal({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<{ url: string; name: string } | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        if (file) {
            formData.append("fileUrl", file.url);
            formData.append("fileName", file.name);
        }
        try {
            await addEvent(formData);
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
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-black uppercase mb-6">Créer un événement</h2>
                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Titre</label>
                        <input name="title" required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Description</label>
                        <textarea name="description" required rows={4} className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Date</label>
                            <input name="date" type="datetime-local" required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Lieu</label>
                            <input name="location" required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Audience cible</label>
                        <select name="target" required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium">
                            <option value="all">Tout le monde</option>
                            <option value="subscribers">Membres du club</option>
                            <option value="visitors">Visiteurs</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-2">Fichier PDF (optionnel)</label>
                        {file ? (
                            <div className="flex items-center gap-2 p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl">
                                <span className="text-xs">📄</span>
                                <input
                                    type="text"
                                    value={file.name}
                                    onChange={(e) => setFile({ ...file, name: e.target.value })}
                                    className="flex-1 bg-transparent text-sm font-bold outline-none"
                                    placeholder="Nom d'affichage"
                                />
                                <button
                                    type="button"
                                    onClick={() => setFile(null)}
                                    className="shrink-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <FileUpload
                                folder={R2_FOLDERS.articles}
                                multiple={false}
                                accept="application/pdf"
                                label="+ Ajouter un PDF"
                                onUploaded={(urls) => setFile({ url: urls[0], name: "" })}
                            />
                        )}
                    </div>

                    {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full border-2 border-black font-black uppercase hover:bg-zinc-100 transition-all">
                            Annuler
                        </button>
                        <button type="submit" disabled={loading} className="flex-1 py-3 rounded-full bg-black text-white font-black uppercase hover:bg-amas-orange transition-all disabled:bg-zinc-400">
                            {loading ? "Création..." : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
