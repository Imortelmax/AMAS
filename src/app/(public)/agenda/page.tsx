import { prisma } from "@/lib/db";
import type { EventData } from "@/types";
import { startOfYear, endOfYear, startOfMonth, endOfMonth } from "date-fns";
import YearView from "@/components/shared/agenda/YearView";
import MonthView from "@/components/shared/agenda/MonthView";

export default async function AgendaPage({
    searchParams,
}: {
    searchParams: Promise<{ month?: string; year?: string }>;
}) {
    const resolvedParams = await searchParams;
    const now = new Date();
    const currentYear = resolvedParams.year ? parseInt(resolvedParams.year) : now.getFullYear();

    if (resolvedParams.month !== undefined) {
        const currentMonth = parseInt(resolvedParams.month);
        const displayedDate = new Date(currentYear, currentMonth, 1);
        const events: EventData[] = await prisma.event.findMany({
            where: {
                date: {
                    gte: startOfMonth(displayedDate),
                    lte: endOfMonth(displayedDate),
                },
            },
        });

        return (
            <main className="pt-22 px-4 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center text-white">Agenda</h1>
                    <MonthView year={currentYear} month={currentMonth} events={events} />
                </div>
            </main>
        );
    }

    const yearStart = new Date(currentYear, 0, 1);
    const events: EventData[] = await prisma.event.findMany({
        where: {
            date: {
                gte: startOfYear(yearStart),
                lte: endOfYear(yearStart),
            },
        },
    });

    return (
        <main className="pt-22 px-4 pb-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Agenda</h1>
                <YearView year={currentYear} events={events} />
            </div>
        </main>
    );
}
