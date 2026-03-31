"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { addBureauMember, updateBureauMember } from "./actions";
import { CLOUDINARY_FOLDERS, UPLOAD_PRESET } from "@/lib/cloudinary";
import type { Member, MemberRole } from "@prisma/client";

const ROLES: { value: MemberRole; label: string }[] = [
    { value: "president", label: "Président" },
    { value: "vice_president", label: "Vice-Président" },
    { value: "secretaire", label: "Secrétaire" },
    { value: "tresorier", label: "Trésorier" },
    { value: "technique", label: "Référent Technique" },
    { value: "communication", label: "Communication" },
];

type Props = {
    member?: Member;
    onClose: () => void;
};

export default function BureauModal({ member, onClose }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(member?.imageUrl ?? "");

    const isEdit = !!member;
    const updateById = isEdit ? updateBureauMember.bind(null, member.id) : null;

    async function handleSubmit(formData: FormData) {
        if (!imageUrl) {
            setError("Une photo est requise.");
            return;
        }
        formData.set("imageUrl", imageUrl);
        setLoading(true);
        setError(null);
        try {
            if (isEdit && updateById) {
                await updateById(formData);
            } else {
                await addBureauMember(formData);
            }
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
                <h2 className="text-2xl font-black uppercase mb-6">
                    {isEdit ? "Modifier le membre" : "Ajouter un membre"}
                </h2>
                <form action={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Prénom</label>
                            <input name="firstname" defaultValue={member?.firstname} required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Nom</label>
                            <input name="lastname" defaultValue={member?.lastname} required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Téléphone</label>
                        <input name="phone" type="tel" defaultValue={member?.phone} required className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium" />
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-2">Rôle(s)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {ROLES.map((role) => (
                                <label key={role.value} className="flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="role"
                                        value={role.value}
                                        defaultChecked={member?.role.includes(role.value)}
                                        className="w-4 h-4 accent-black"
                                    />
                                    <span className="text-sm font-bold">{role.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-2">Photo</label>
                        {imageUrl && (
                            <div className="relative w-24 h-24 mx-auto mb-3">
                                <Image src={imageUrl} alt="Aperçu" fill className="object-cover rounded-full border-4 border-black" />
                                <button
                                    type="button"
                                    onClick={() => setImageUrl("")}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        <CldUploadWidget
                            uploadPreset={UPLOAD_PRESET}
                            options={{
                                folder: CLOUDINARY_FOLDERS.bureau,
                                multiple: false,
                                resourceType: "image",
                                cropping: true,
                                croppingAspectRatio: 1,
                            }}
                            onSuccess={(result) => {
                                if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
                                    setImageUrl(result.info.secure_url as string);
                                }
                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="w-full py-3 border-2 border-dashed border-zinc-300 rounded-xl text-sm font-black uppercase text-zinc-400 hover:border-black hover:text-black transition-all"
                                >
                                    {imageUrl ? "Changer la photo" : "+ Ajouter une photo"}
                                </button>
                            )}
                        </CldUploadWidget>
                    </div>
                    {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full border-2 border-black font-black uppercase hover:bg-zinc-100 transition-all">
                            Annuler
                        </button>
                        <button type="submit" disabled={loading} className="flex-1 py-3 rounded-full bg-black text-white font-black uppercase hover:bg-orange-600 transition-all disabled:bg-zinc-400">
                            {loading ? "Sauvegarde..." : isEdit ? "Enregistrer" : "Ajouter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
