"use client";

import { useState } from "react";
import type { TargetAudience } from "@/types";

interface RegistrationModalProps {
    eventId: string;
    eventTitle: string;
    eventTarget: TargetAudience;
    onClose: () => void;
}

export default function RegistrationModal({ eventId, eventTitle, eventTarget, onClose }: RegistrationModalProps) {
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/events/${eventId}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error ?? "Une erreur est survenue.");
        } else {
            setSuccess(true);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-black text-white w-full max-w-md rounded-[40px] p-10 relative border-2 border-white/20">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-8 text-zinc-500 hover:text-white transition text-xl leading-none"
                    aria-label="Fermer"
                >
                    ✕
                </button>

                {success ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">Inscription confirmée !</h2>
                        <p className="text-zinc-300 mb-8">Votre inscription à <span className="font-bold text-white">{eventTitle}</span> a bien été enregistrée.</p>
                        <button
                            onClick={onClose}
                            className="w-full bg-amas-orange text-white font-bold py-3 uppercase text-xs tracking-[0.2em] hover:opacity-90 transition rounded-sm"
                        >
                            Fermer
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-2 uppercase tracking-tight">
                            S'inscrire
                        </h2>
                        <p className="text-zinc-400 text-center text-sm mb-8">{eventTitle}</p>

                        {eventTarget === "subscribers" && (
                            <p className="text-xs text-amas-orange text-center mb-6 border border-amas-orange/40 rounded-sm px-3 py-2">
                                Cet événement est réservé aux membres du club. Vos informations doivent correspondre à votre dossier d'adhérent.
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-widest">Prénom</label>
                                    <input
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-sm focus:outline-none focus:border-amas-orange text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-widest">Nom</label>
                                    <input
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-sm focus:outline-none focus:border-amas-orange text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-widest">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-sm focus:outline-none focus:border-amas-orange text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-widest">Téléphone</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-sm focus:outline-none focus:border-amas-orange text-sm"
                                />
                            </div>

                            {error && (
                                <p className="text-red-400 text-xs text-center border border-red-400/40 rounded-sm px-3 py-2">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black font-bold py-3 uppercase text-xs tracking-[0.2em] hover:bg-amas-orange hover:text-white transition disabled:opacity-50 mt-2 rounded-sm"
                            >
                                {loading ? "Envoi..." : "Confirmer l'inscription"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
