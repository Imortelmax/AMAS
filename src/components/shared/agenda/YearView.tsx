"use client";

import { format, getDay, getDaysInMonth } from "date-fns";
import { fr } from "date-fns/locale";
import type { EventData } from "@/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface YearViewProps {
    year: number;
    events: EventData[];
}

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

function MiniMonthCalendar({
    year,
    month,
    events,
}: {
    year: number;
    month: number;
    events: EventData[];
}) {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = getDaysInMonth(firstDay);

    let startDow = getDay(firstDay); // 0=Sun
    startDow = startDow === 0 ? 6 : startDow - 1; // Mon=0

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    const eventDays = new Set(
        events
            .filter((e) => {
                const d = new Date(e.date);
                return d.getFullYear() === year && d.getMonth() === month;
            })
            .map((e) => new Date(e.date).getDate())
    );

    const cells: (number | null)[] = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <Link
            href={`/agenda?month=${month}&year=${year}`}
            className="bg-white rounded-2xl p-3 hover:shadow-lg transition-shadow cursor-pointer block"
        >
            <div className="text-sm font-bold capitalize mb-2 text-zinc-800">
                {format(firstDay, "MMMM", { locale: fr })}
            </div>

            <div className="grid grid-cols-7 gap-0 mb-1">
                {DAY_LABELS.map((d, i) => (
                    <div key={i} className="text-center text-[9px] text-zinc-400 font-medium">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-0">
                {cells.map((day, i) => {
                    if (day === null) return <div key={`e-${i}`} className="h-5" />;

                    const isToday = isCurrentMonth && today.getDate() === day;
                    const hasEvent = eventDays.has(day);

                    return (
                        <div key={day} className="flex flex-col items-center h-6">
                            <span
                                className={`w-4 h-4 flex items-center justify-center rounded-full text-[9px] leading-none
                                    ${isToday
                                        ? "bg-amas-orange text-white font-bold"
                                        : "text-zinc-600"
                                    }`}
                            >
                                {day}
                            </span>
                            {hasEvent && (
                                <span className="w-1 h-1 rounded-full bg-amas-orange -mt-0.5" />
                            )}
                        </div>
                    );
                })}
            </div>
        </Link>
    );
}

export default function YearView({ year, events }: YearViewProps) {
    return (
        <div>
            <div className="flex items-center justify-center gap-6 mb-8">
                <Link
                    href={`/agenda?year=${year - 1}`}
                    className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </Link>
                <span className="text-3xl font-bold text-white">{year}</span>
                <Link
                    href={`/agenda?year=${year + 1}`}
                    className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {MONTHS.map((month) => (
                    <MiniMonthCalendar
                        key={month}
                        year={year}
                        month={month}
                        events={events}
                    />
                ))}
            </div>
        </div>
    );
}
