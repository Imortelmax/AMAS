"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { addMoto, updateMoto } from "./actions";
import { CLOUDINARY_FOLDERS, UPLOAD_PRESET } from "@/lib/cloudinary";
import type { Moto, MotoImage } from "@/types";

type MotoWithImages = Moto & { images: MotoImage[] };

type Props = {
    moto?: MotoWithImages;
    onClose: () => void;
};

export default function MotoModal({ moto, onClose }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>(
        moto?.images.map((img) => img.url) ?? []
    );

    const isEdit = !!moto;
    const updateMotoById = isEdit ? updateMoto.bind(null, moto.id) : null;

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        images.forEach((url) => formData.append("imageUrl", url));
        try {
            if (isEdit && updateMotoById) {
                await updateMotoById(formData);
            } else {
                await addMoto(formData);
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
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-black uppercase mb-6">
                    {isEdit ? "Modifier la moto" : "Ajouter une moto"}
                </h2>
                <form action={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Modèle</label>
                            <input
                                name="model"
                                defaultValue={moto?.model}
                                required
                                className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Année</label>
                            <input
                                name="year"
                                type="number"
                                defaultValue={moto?.year}
                                required
                                min={1900}
                                max={new Date().getFullYear()}
                                className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Description</label>
                        <textarea
                            name="description"
                            defaultValue={moto?.description}
                            required
                            rows={4}
                            className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase mb-2">Photos</label>
                        {images.length > 0 && (
                            <div className="grid grid-cols-4 gap-2 mb-3">
                                {images.map((url, i) => (
                                    <div key={i} className="relative group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={url}
                                            alt=""
                                            className="w-full h-20 object-cover rounded-xl border-2 border-zinc-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <CldUploadWidget
                            uploadPreset={UPLOAD_PRESET}
                            options={{
                                folder: CLOUDINARY_FOLDERS.motos,
                                multiple: true,
                                resourceType: "image",
                            }}
                            onSuccess={(result) => {
                                const info = result.info;
                                if (info && typeof info === "object" && "secure_url" in info) {
                                    setImages((prev) => [...prev, (info as { secure_url: string }).secure_url]);
                                }
                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="w-full py-3 border-2 border-dashed border-zinc-300 rounded-xl text-sm font-black uppercase text-zinc-400 hover:border-black hover:text-black transition-all"
                                >
                                    + Ajouter des photos
                                </button>
                            )}
                        </CldUploadWidget>
                    </div>

                    {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-full border-2 border-black font-black uppercase hover:bg-zinc-100 transition-all"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 rounded-full bg-black text-white font-black uppercase hover:bg-amas-orange transition-all disabled:bg-zinc-400"
                        >
                            {loading ? "Sauvegarde..." : isEdit ? "Enregistrer" : "Ajouter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
