// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black">
        {/* Ici tu pourras mettre une belle photo de moto de ton Figma en background */}
        <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            ASSOCIATION MOTO <br /> <span className="text-orange-600">AMAS</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-zinc-300">
            Rejoignez une communauté de passionnés, participez à des sorties inoubliables et partagez l'esprit de la route.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agenda" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg transition">
              Voir l'agenda
            </Link>
            <Link href="/association" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-md font-bold text-lg transition">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Tu pourras ajouter ici la section "Prochaines sorties" plus tard */}
    </div>
  );
}