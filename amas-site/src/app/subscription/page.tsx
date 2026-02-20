import { Facebook, Mail, Phone } from "lucide-react";

export default function SortiesPage() {
    return (
        <main className="pt-22 px-4">
            <div className="max-w-4xl mx-auto text-center bg-zinc-100 p-6 border-2 rounded-2xl text-lg">
                <h1 className="text-4xl text-center font-bold">Pour nous rejoindre</h1>

                <div className="flex flex-col items-center space-y-4 pb-4 m-10">
                    <p>Pour rejoindre l'amicale, il suffit de nous contacter via les moyens ci-dessous.</p>
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
                <h1 className="text-center m-4">Ou alors avec le formulaire d'inscription à télécharger ci dessous</h1>
                <a href="" download className="inline-block mt-4 px-6 py-3 bg-amas-orange text-white rounded-lg hover:bg-orange-700 transition"> Formulaire d'inscription</a>
            </div>
        </main>
    )
}