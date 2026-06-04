"use client";

import { useState } from "react";
import type { EventData, TargetAudience } from "@/types";
import RegistrationModal from "@/components/shared/registration-modal";

function takeTarget(target: TargetAudience) {
    switch (target) {
        case "all": return "Tout le monde";
        case "subscribers": return "Membres du club";
        case "visitors": return "Visiteurs";
        default: return target;
    }
}

interface EventModalProps {
    event: EventData;
    onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
    const [showRegister, setShowRegister] = useState(false);

    if (showRegister) {
        return (
            <RegistrationModal
                eventId={event.id}
                eventTitle={event.title}
                eventTarget={event.target}
                onClose={() => setShowRegister(false)}
            />
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-black text-white w-full max-w-md rounded-[40px] p-10 relative border-2 border-white/20">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-8 text-zinc-500 hover:text-white text-xl leading-none transition"
                    aria-label="Fermer"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-tight">
                    {event.title}
                </h2>

                <ul className="space-y-4 text-zinc-300 mb-12">
                    <li className="flex gap-2">• <span className="font-bold">Où :</span> {event.location}</li>
                    <li className="flex gap-2">• <span className="font-bold">Public :</span> {takeTarget(event.target)}</li>
                    <li className="flex gap-2 leading-relaxed text-left">• {event.description}</li>
                </ul>

                <div className="flex flex-col gap-4">
                    {event.fileUrl && event.fileName && (
                        <a
                            href={event.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-bold text-amas-orange hover:opacity-80 transition"
                        >
                            📄 {event.fileName}
                        </a>
                    )}
                    <button
                        onClick={() => setShowRegister(true)}
                        className="text-right font-bold hover:text-amas-orange transition uppercase tracking-widest text-sm"
                    >
                        S&apos;inscrire
                    </button>
                </div>
            </div>
        </div>
    );
}
