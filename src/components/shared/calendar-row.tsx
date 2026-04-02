"use client";

import { useState } from "react";
import { format }from "date-fns";
import { fr } from "date-fns/locale";
import { Event, TargetAudience } from "@prisma/client";
import RegistrationModal from "@/components/shared/registration-modal";

export default function CalendarRow({ day, events }: { day: Date; events: Event[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [registerEvent, setRegisterEvent] = useState<Event | null>(null);

    const handleOpen = (event: Event) => {
        setSelectedEvent(event);
        setIsOpen(true);
    };

    function takeTarget(target: TargetAudience) {
        switch (target) {
            case TargetAudience.all:
                return "Tout le monde";
            case TargetAudience.subscribers:
                return "Membres du club";
            case TargetAudience.visitors:
                return "Visiteurs";
            default:
                return target;
        }
    };

    return (
        <>
            <div className="grid grid-cols-[150px_1fr] border-b border-zinc-400 min-h-[50px]">
                <div className="flex items-center justify-center border-r-2 border-zinc-400 bg-zinc-100 font-medium">
                    {format(day, "EEEE d", { locale: fr })}
                </div>
                <div className="flex flex-col justify-center px-4 gap-1 py-2">
                    {events.map((event) => (
                        <button
                            key={event.id}
                            onClick={() => handleOpen(event)}
                            className="text-left font-bold hover:text-amas-orange transition cursor-pointer"
                        >
                            {event.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* MODALE (Style inspiré de ta maquette noire) */}
            {isOpen && selectedEvent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-black text-white w-full max-w-md rounded-[40px] p-10 relative border-2 border-white/20">
                        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-tight">
                            {selectedEvent.title}
                        </h2>
                        
                        <ul className="space-y-4 text-zinc-300 mb-12">
                            <li className="flex gap-2">• <span className="font-bold">Où :</span> {selectedEvent.location}</li>
                            <li className="flex gap-2">• <span className="font-bold">Public :</span> {takeTarget(selectedEvent.target)}</li>
                            <li className="flex gap-2 leading-relaxed text-left">
                            • {selectedEvent.description}
                            </li>
                        </ul>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setRegisterEvent(selectedEvent);
                                }}
                                className="text-right font-bold hover:text-amas-orange transition uppercase tracking-widest text-sm"
                            >
                                S'inscrire
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-8 text-zinc-500 hover:text-white"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {registerEvent && (
                <RegistrationModal
                    eventId={registerEvent.id}
                    eventTitle={registerEvent.title}
                    eventTarget={registerEvent.target}
                    onClose={() => setRegisterEvent(null)}
                />
            )}
        </>
    );
}