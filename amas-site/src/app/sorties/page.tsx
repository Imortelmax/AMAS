import { prisma } from "@/lib/db";
import ArticleCaroussel from "@/components/shared/article-caroussel";

export default async function SortiesPage() {
    const articles = await prisma.article.findMany({
        where: { published: true },
        include: {
            imageUrl: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="min-h-screen pt-22 pb-20 px-4">
            <div className="max-w-4xl mx-auto text-center bg-zinc-100 p-6 border-2 rounded-2xl">
                <h1 className="text-4xl text-center font-bold mb-4">Nos dernières sorties</h1>

                <div>
                    {articles.map((article) => (
                        <article key={article.id} className="p-4">
                            <h1 className="text-2xl font-bold">{article.title}</h1>
                            
                            <p className="italic p-2">
                                {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(article.createdAt)}
                            </p>
                            
                            <p className="p-2">{article.content}</p>
                            
                            <ArticleCaroussel images={article.imageUrl} title={article.title} />

                            <div className="h-1 w-30 bg-black mx-auto mt-8" />
                        </article>
                    ))}
                </div>
            </div>
        </main>
    )
}