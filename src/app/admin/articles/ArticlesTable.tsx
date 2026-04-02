"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Article, ArticleImage } from "@/types";
import { deleteArticle, togglePublished } from "./actions";
import ArticleModal from "./ArticleModal";

type ArticleWithImages = Article & { imageUrl: ArticleImage[] };

const TYPE_LABELS = {
    sortie: "Sortie",
    realisation: "Réalisation",
};

const TYPE_STYLES = {
    sortie: "bg-blue-100 text-blue-700",
    realisation: "bg-amas-orange/20 text-navbar-bg",
};

const TABS = [
    { label: "Tous", value: "" },
    { label: "Sorties", value: "sortie" },
    { label: "Réalisations", value: "realisation" },
];

type Props = {
    articles: ArticleWithImages[];
    currentPage: number;
    totalPages: number;
    currentType: string;
};

export default function ArticlesTable({ articles, currentPage, totalPages, currentType }: Props) {
    const router = useRouter();
    const [addOpen, setAddOpen] = useState(false);
    const [editArticle, setEditArticle] = useState<ArticleWithImages | null>(null);

    async function handleDelete(id: string, title: string) {
        if (!confirm(`Supprimer "${title}" ?`)) return;
        await deleteArticle(id);
        router.refresh();
    }

    async function handleTogglePublished(id: string, published: boolean) {
        await togglePublished(id, !published);
        router.refresh();
    }

    function goToPage(page: number) {
        const params = new URLSearchParams();
        if (currentType) params.set("type", currentType);
        params.set("page", String(page));
        router.push(`?${params.toString()}`);
    }

    function goToType(type: string) {
        const params = new URLSearchParams();
        if (type) params.set("type", type);
        router.push(`?${params.toString()}`);
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-black uppercase">Articles</h1>
                <button
                    onClick={() => setAddOpen(true)}
                    className="px-6 py-3 bg-black text-white rounded-full font-black uppercase text-sm hover:bg-amas-orange transition-all"
                >
                    + Créer un article
                </button>
            </div>

            <div className="flex gap-2 mb-6">
                {TABS.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => goToType(tab.value)}
                        className={`px-5 py-2 rounded-full font-black uppercase text-sm transition-all border-2 border-black ${
                            currentType === tab.value
                                ? "bg-black text-white"
                                : "hover:bg-zinc-100"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Titre</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Photos</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Publié</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-zinc-400 font-bold">
                                    Aucun article pour l&apos;instant
                                </td>
                            </tr>
                        ) : (
                            articles.map((article) => (
                                <tr key={article.id} className="border-t border-zinc-100 hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4 font-bold max-w-xs truncate">{article.title}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${TYPE_STYLES[article.type]}`}>
                                            {TYPE_LABELS[article.type]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-500 font-bold">
                                        {article.imageUrl.length} photo{article.imageUrl.length !== 1 ? "s" : ""}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleTogglePublished(article.id, article.published)}
                                            className={`px-3 py-1 rounded-full text-xs font-black uppercase transition-all ${
                                                article.published
                                                    ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700"
                                                    : "bg-zinc-100 text-zinc-500 hover:bg-green-100 hover:text-green-700"
                                            }`}
                                        >
                                            {article.published ? "Publié" : "Brouillon"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-400">
                                        {article.createdAt.toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditArticle(article)}
                                                className="px-3 py-1 text-xs font-black uppercase border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(article.id, article.title)}
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

            {addOpen && <ArticleModal onClose={() => setAddOpen(false)} />}
            {editArticle && <ArticleModal article={editArticle} onClose={() => setEditArticle(null)} />}
        </>
    );
}
