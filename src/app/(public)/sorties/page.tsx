import { prisma } from "@/lib/db";
import ArticleCaroussel from "@/components/shared/article-caroussel";

type ArticleWithMedia = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    imageUrl: { id: string; url: string }[];
    videos: { id: string; url: string }[];
};

export default async function SortiesPage() {
    const articles: ArticleWithMedia[] = await prisma.article.findMany({
        where: {
            published: true,
            type: "sortie"
        },
        include: {
            imageUrl: true,
            videos: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="  pt-22   px-4">
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

                            {article.videos.length > 0 && (
                                <div className="flex flex-col gap-4 mt-4">
                                    {article.videos.map((video) => (
                                        <video
                                            key={video.id}
                                            src={video.url}
                                            controls
                                            className="w-full max-w-[400px] mx-auto rounded-lg"
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="h-1 w-30 bg-black mx-auto mt-8" />
                        </article>
                    ))}
                </div>
            </div>
        </main>
    )
}
