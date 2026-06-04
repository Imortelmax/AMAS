"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addArticle, updateArticle } from "./actions";
import { R2_FOLDERS } from "@/lib/r2";
import FileUpload from "@/components/shared/FileUpload";
import type { Article, ArticleImage, ArticleVideo } from "@/types";

type ArticleWithMedia = Article & { imageUrl: ArticleImage[]; videos: ArticleVideo[] };

type Props = {
    article?: ArticleWithMedia;
    onClose: () => void;
};

export default function ArticleModal({ article, onClose }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>(
        article?.imageUrl.map((img) => img.url) ?? []
    );
    const [videos, setVideos] = useState<string[]>(
        article?.videos.map((v) => v.url) ?? []
    );

    const isEdit = !!article;
    const updateArticleById = isEdit ? updateArticle.bind(null, article.id) : null;

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        images.forEach((url) => formData.append("imageUrl", url));
        videos.forEach((url) => formData.append("videoUrl", url));
        try {
            if (isEdit && updateArticleById) {
                await updateArticleById(formData);
            } else {
                await addArticle(formData);
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
                    {isEdit ? "Modifier l'article" : "Créer un article"}
                </h2>
                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Titre</label>
                        <input
                            name="title"
                            defaultValue={article?.title}
                            required
                            className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Contenu</label>
                        <textarea
                            name="content"
                            defaultValue={article?.content}
                            required
                            rows={6}
                            className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Type</label>
                            <select
                                name="type"
                                defaultValue={article?.type ?? "sortie"}
                                className="w-full p-3 bg-zinc-100 border-2 border-zinc-200 rounded-xl outline-none focus:border-black font-medium"
                            >
                                <option value="sortie">Sortie</option>
                                <option value="realisation">Réalisation</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <input
                                type="checkbox"
                                name="published"
                                value="true"
                                defaultChecked={article?.published ?? false}
                                id="published"
                                className="w-5 h-5 accent-black"
                            />
                            <label htmlFor="published" className="text-sm font-black uppercase">
                                Publier immédiatement
                            </label>
                        </div>
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
                        <FileUpload
                            folder={R2_FOLDERS.articles}
                            multiple
                            accept="image/*"
                            label="+ Ajouter des photos"
                            onUploaded={(urls) => setImages((prev) => [...prev, ...urls])}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase mb-2">Vidéos</label>
                        {videos.length > 0 && (
                            <div className="flex flex-col gap-2 mb-3">
                                {videos.map((url, i) => (
                                    <div key={i} className="relative group flex items-center gap-2 p-2 bg-zinc-100 rounded-xl border-2 border-zinc-200">
                                        <span className="text-xs font-bold truncate flex-1 text-zinc-600">{url.split("/").pop()}</span>
                                        <button
                                            type="button"
                                            onClick={() => setVideos((prev) => prev.filter((_, idx) => idx !== i))}
                                            className="shrink-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <FileUpload
                            folder={R2_FOLDERS.articles}
                            multiple
                            accept="video/mp4,video/webm,video/quicktime"
                            label="+ Ajouter des vidéos"
                            onUploaded={(urls) => setVideos((prev) => [...prev, ...urls])}
                        />
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
                            {loading ? "Sauvegarde..." : isEdit ? "Enregistrer" : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
