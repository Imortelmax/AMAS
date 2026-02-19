import { Facebook, Mail, Phone } from "lucide-react"

export default async function SortiesPage() {

    return (
        <main className="  pt-22   px-4">
            <div className="max-w-4xl mx-auto text-center bg-zinc-100 p-6 border-2 rounded-2xl">
                <h1 className="text-4xl text-center font-bold mb-4">Pour nous contacter</h1>

                <div className="flex flex-col items-center space-y-4">
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
                <div>
                    <p>Ou envoyez-nous un message via le formulaire ci-dessous :</p>
                    
                </div>
            </div>
        </main>
    )
}