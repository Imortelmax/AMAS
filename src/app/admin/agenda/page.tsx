import { prisma } from "@/lib/db";
import EventsTable from "./EventsTable";

const PER_PAGE = 10;

export default async function AgendaPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page: pageParam } = await searchParams;
    const currentPage = Math.max(1, Number(pageParam) || 1);
    const skip = (currentPage - 1) * PER_PAGE;

    const [events, total] = await Promise.all([
        prisma.event.findMany({
            orderBy: { date: "desc" },
            skip,
            take: PER_PAGE,
        }),
        prisma.event.count(),
    ]);

    const totalPages = Math.ceil(total / PER_PAGE);

    return (
        <EventsTable
            events={events}
            currentPage={currentPage}
            totalPages={totalPages}
        />
    );
}
