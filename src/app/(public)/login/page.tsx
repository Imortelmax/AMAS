"use client";

import { useState } from "react";
import { login } from "@/app/action/auth"; // Vérifie que le chemin est bien celui-ci
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        try {
            const result = await login(formData);
            
            if (result) {
                // Si l'action retourne une string, c'est un message d'erreur
                setError(result);
            } else {
                // Si pas d'erreur, NextAuth redirige ou on force vers le dashboard
                router.push("/admin/dashboard");
                router.refresh();
            }
        } catch (e) {
            setError("Une erreur inattendue est survenue.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="max-w-md w-full bg-white p-10 rounded-[40px] border-4 border-black shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                        AMAS <span className="text-amas-orange">ADMIN</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mt-2">
                        Espace de gestion sécurisé
                    </p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black uppercase mb-2 ml-2">Email de l'admin</label>
                        <input 
                            name="email"
                            type="email" 
                            placeholder="exemple@amas.fr" 
                            required
                            className="w-full p-4 bg-zinc-100 border-2 border-zinc-200 rounded-2xl outline-none focus:border-black font-bold transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-2 ml-2">Mot de passe</label>
                        <input 
                            name="password"
                            type="password" 
                            placeholder="••••••••" 
                            required
                            className="w-full p-4 bg-zinc-100 border-2 border-zinc-200 rounded-2xl outline-none focus:border-black font-bold transition-all"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl text-red-600 text-center text-sm font-bold animate-shake">
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded-full font-black uppercase tracking-widest hover:bg-amas-orange transition-all disabled:bg-zinc-400 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Vérification...
                            </span>
                        ) : "Se connecter"}
                    </button>
                </form>
            </div>
        </main>
    );
}