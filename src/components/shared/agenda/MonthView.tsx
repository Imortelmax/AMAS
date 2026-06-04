"use client";

import { format, getDay, getDaysInMonth } from "date-fns";
import { fr } from "date-fns/locale";
import type { EventData } from "@/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import EventModal from "./EventModal";

interface MonthViewProps {
    year: number;
    month: number;
    events: EventData[];
}

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function MonthView({ year, month, events }: MonthViewProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

    const firstDay = new Date(year, month, 1);
    const daysInMonth = getDaysInMonth(firstDay);
    const today = new Date();

    let startDow = getDay(firstDay);
    startDow = startDow === 0 ? 6 : startDow - 1;

    const prevDate = month === 0 ? new Date(year - 1, 11, 1) : new Date(year, month - 1, 1);
    const nextDate = month === 11 ? new Date(year + 1, 0, 1) : new Date(year, month + 1, 1);

    const cells: (number | null)[] = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const getEventsForDay = (day: number) =>
        events.filter((e) => {
            const d = new Date(e.date);
            return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
        });

    const isToday = (day: number) =>
        today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Link
                    href={`/agenda?year=${year}`}
                    className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Agenda
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/agenda?month=${prevDate.getMonth()}&year=${prevDate.getFullYear()}`}
                        className="w-7 h-7 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition"
                    >
                        <ChevronLeft className="w-4 h-4 text-white" />
                    </Link>
                    <h2 className="text-xl font-bold capitalize text-white min-w-[160px] text-center">
                        {format(firstDay, "MMMM yyyy", { locale: fr })}
                    </h2>
                    <Link
                        href={`/agenda?month=${nextDate.getMonth()}&year=${nextDate.getFullYear()}`}
                        className="w-7 h-7 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition"
                    >
                        <ChevronRight className="w-4 h-4 text-white" />
                    </Link>
                </div>

                <div className="w-16" />
            </div>

            {/* Grid */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-zinc-100">
                    {DAY_LABELS.map((d) => (
                        <div
                            key={d}
                            className="text-center text-xs text-zinc-400 py-2 font-semibold"
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* Cells */}
                <div className="grid grid-cols-7">
                    {cells.map((day, i) => {
                        const isLastInRow = (i + 1) % 7 === 0;
                        const isLastRow = i >= cells.length - 7;

                        if (day === null) {
                            return (
                                <div
                                    key={`e-${i}`}
                                    className={`min-h-[80px] bg-zinc-50
                                        ${!isLastInRow ? "border-r border-zinc-100" : ""}
                                        ${!isLastRow ? "border-b border-zinc-100" : ""}
                                    `}
                                />
                            );
                        }

                        const dayEvents = getEventsForDay(day);
                        const todayCell = isToday(day);

                        return (
                            <div
                                key={day}
                                className={`min-h-[80px] p-1.5
                                    ${!isLastInRow ? "border-r border-zinc-100" : ""}
                                    ${!isLastRow ? "border-b border-zinc-100" : ""}
                                `}
                            >
                                <div
                                    className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold mb-1
                                        ${todayCell
                                            ? "bg-amas-orange text-white"
                                            : "text-zinc-700"
                                        }`}
                                >
                                    {day}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    {dayEvents.map((event) => (
                                        <button
                                            key={event.id}
                                            onClick={() => setSelectedEvent(event)}
                                            className="text-left text-[10px] leading-tight bg-amas-orange text-white rounded px-1.5 py-0.5 truncate w-full hover:opacity-80 transition font-medium"
                                        >
                                            {event.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
}
