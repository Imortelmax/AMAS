import { prisma } from "@/lib/db";
import type { ArticleType } from "@/types";
import ArticlesTable from "./ArticlesTable";

const PER_PAGE = 10;

export default async function ArticlesPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; type?: string }>;
}) {
    const { page: pageParam, type } = await searchParams;
    const currentPage = Math.max(1, Number(pageParam) || 1);
    const currentType = type ?? "";
    const skip = (currentPage - 1) * PER_PAGE;

    const where = currentType ? { type: currentType as ArticleType } : {};

    const [articles, total] = await Promise.all([
        prisma.article.findMany({
            where,
            include: { imageUrl: true },
            orderBy: { createdAt: "desc" },
            skip,
            take: PER_PAGE,
        }),
        prisma.article.count({ where }),
    ]);

    const totalPages = Math.ceil(total / PER_PAGE);

    return (
        <ArticlesTable
            articles={articles}
            currentPage={currentPage}
            totalPages={totalPages}
            currentType={currentType}
        />
    );
}
