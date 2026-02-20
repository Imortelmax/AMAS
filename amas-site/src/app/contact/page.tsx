"use client";

import { Facebook, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { sendContactEmail } from "../action/send-email";

export default function SortiesPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleAction(formData: FormData) {
        setStatus("loading");
        const result = await sendContactEmail(formData);
        if (result.success) setStatus("success");
        else setStatus("error");
    }

    return (
        <main className="  pt-22   px-4">
            <div className="max-w-4xl mx-auto text-center bg-zinc-100 p-6 border-2 rounded-2xl">
                <h1 className="text-4xl text-center font-bold mb-4">Pour nous contacter</h1>

                <div className="flex flex-col items-center space-y-4 pb-4">
                    <div className="flex items-center space-x-2">
                        <Facebook className="w-6 h-6" />
                        <a href="https://www.facebook.com/profile.php?id=61558964401689&locale=fr_FR" target="_blank">Sur Facebook: AMAS - Amicale motos anciennes salernoise</a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Mail className="w-6 h-6" />
                        <a href="mailto:contact.amas83@gmail.com">Par mail : contact.amas83@gmail.com</a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Phone className="w-6 h-6" />
                        <span>Par téléphone : 06 95 05 63 21</span>
                    </div>
                </div>

                {/* Mail form */}
                <div className="max-w-2xl mx-auto bg-zinc-100 p-10 border-1 border-zinc-400 rounded-[40px] shadow-xl">
                    <h1 className="text-4xl font-black uppercase text-center mb-8">Nous Contacter</h1>

                    {status === "success" ? (
                    <div className="bg-green-100 text-green-800 p-6 rounded-2xl text-center font-bold">
                        Message envoyé ! Vérifie ta boîte mail (et tes spams).
                    </div>
                    ) : (
                    <form action={handleAction} className="space-y-6">
                        <input 
                            name="name" type="text" placeholder="NOM / PRÉNOM" required
                            className="w-full p-4 bg-white border-2 border-zinc-300 rounded-2xl outline-none focus:border-black font-bold"
                        />
                        <input 
                            name="email" type="email" placeholder="EMAIL" required
                            className="w-full p-4 bg-white border-2 border-zinc-300 rounded-2xl outline-none focus:border-black font-bold"
                        />
                        <textarea 
                            name="message" placeholder="VOTRE MESSAGE..." required rows={6}
                            className="w-full p-4 bg-white border-2 border-zinc-300 rounded-2xl outline-none focus:border-black font-bold"
                        />
                        
                        <button 
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-orange-600 transition disabled:bg-zinc-400"
                        >
                            {status === "loading" ? "Envoi..." : "Envoyer le message"}
                        </button>
                    </form>
                    )}
                </div>
            </div>
        </main>
    )
}