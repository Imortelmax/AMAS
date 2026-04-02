import { prisma } from "@/lib/db";
import MembersTable from "./MembersTable";

const PER_PAGE = 10;

export default async function MembresPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page: pageParam } = await searchParams;
    const currentPage = Math.max(1, Number(pageParam) || 1);
    const skip = (currentPage - 1) * PER_PAGE;

    const [members, total] = await Promise.all([
        prisma.memberClub.findMany({
            orderBy: { createdAt: "desc" },
            skip,
            take: PER_PAGE,
        }),
        prisma.memberClub.count(),
    ]);

    const totalPages = Math.ceil(total / PER_PAGE);

    return (
        <MembersTable
            members={members}
            currentPage={currentPage}
            totalPages={totalPages}
        />
    );
}
