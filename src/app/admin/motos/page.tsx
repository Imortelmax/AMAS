import { prisma } from "@/lib/db";
import MotosTable from "./MotosTable";

const PER_PAGE = 10;

export default async function MotosPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page: pageParam } = await searchParams;
    const currentPage = Math.max(1, Number(pageParam) || 1);
    const skip = (currentPage - 1) * PER_PAGE;

    const [motos, total] = await Promise.all([
        prisma.moto.findMany({
            orderBy: { createdAt: "desc" },
            include: { images: true },
            skip,
            take: PER_PAGE,
        }),
        prisma.moto.count(),
    ]);

    const totalPages = Math.ceil(total / PER_PAGE);

    return (
        <MotosTable
            motos={motos}
            currentPage={currentPage}
            totalPages={totalPages}
        />
    );
}
