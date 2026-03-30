import { prisma } from "@/lib/db";

export default async function DashboardPage() {
    const memberCount = await prisma.memberClub.count();
    const eventCount = await prisma.event.count();

    return (
        <div>
            <h1 className="text-4xl font-black uppercase mb-8">Vue d'ensemble</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[30px] border-2 border-zinc-200 shadow-sm">
                    <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest mb-2">Membres Club</p>
                    <p className="text-5xl font-black">{memberCount}</p>
                </div>
                
                <div className="bg-white p-8 rounded-[30px] border-2 border-zinc-200 shadow-sm">
                    <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest mb-2">Événements</p>
                    <p className="text-5xl font-black text-orange-600">{eventCount}</p>
                </div>
            </div>
            
            <div className="mt-12 bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-[40px] p-20 text-center">
                <p className="text-zinc-400 font-bold italic">Sélectionnez un onglet dans la barre latérale pour commencer à gérer le site.</p>
            </div>
        </div>
    );
}