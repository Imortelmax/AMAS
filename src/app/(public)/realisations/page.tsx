import { prisma } from "@/lib/db";
import ArticleCaroussel from "@/components/shared/article-caroussel";

type ArticleWithImages = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    imageUrl: { id: string; url: string }[];
};

export default async function RealisationsPage() {
    const articles: ArticleWithImages[] = await prisma.article.findMany({
        where: { 
            published: true,
            type: "realisation"
        },
        include: {
            imageUrl: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="  pt-22   px-4">
            <div className="max-w-4xl mx-auto text-center bg-zinc-100 p-6 border-2 rounded-2xl">
                <h1 className="text-4xl text-center font-bold mb-4">Nos dernières réalisations</h1>

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