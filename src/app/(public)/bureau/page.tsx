import { prisma } from "@/lib/db";
import Image from "next/image";
import type { MemberRole } from "@/types";

type BureauMember = {
    id: string;
    firstname: string;
    lastname: string;
    role: string[];
    phone: string;
    imageUrl: string;
};

export default async function BureauPage() {
    const members = await prisma.member.findMany() as BureauMember[];

    // Helper pour filtrer
    const getByRole = (role: MemberRole) =>
        members.filter((m) => m.role.includes(role));

    // On prépare les niveaux
    const level1 = getByRole("president");
    const level2 = [...getByRole("vice_president"), ...getByRole("secretaire"), ...getByRole("tresorier")];
    const level3 = [...getByRole("technique"), ...getByRole("communication")];

    const getRoleLabel = (role: MemberRole) => {
        const labels: Record<MemberRole, string> = {
            president: "Président",
            vice_president: "Vice-Président",
            secretaire: "Secrétaire",
            tresorier: "Trésorier",
            technique: "Référent Technique",
            communication: "Communication"
        };
        return labels[role];
    };

    return (
        <main className="pt-22 px-4">
            <div className="max-w-4xl mx-auto text-center bg-zinc-100 p-8 rounded-[40px] border-1 border-black text-center mb-12">
                <h1 className="text-4xl font-bold mb-8">Notre trombinoscope du bureau</h1>

                <section className="flex justify-center mb-12">
                    {level1.map((m) => (
                        <div key={m.id} className="w-full max-w-sm bg-zinc-100 p-8 rounded-[40px] border-4 border-black text-center shadow-2xl">
                            <div className="relative w-32 h-32 mx-auto mb-4 border-4 border-white rounded-full overflow-hidden shadow-lg">
                                <Image src={m.imageUrl} alt={m.firstname} fill className="object-cover" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase">{m.firstname} {m.lastname}</h2>
                            <p className="text-orange-600 font-black uppercase tracking-tighter">Président</p>
                            <p className="text-sm text-zinc-500 mt-2">{m.phone}</p>
                        </div>
                    ))}
                </section>

                <div className="h-12 w-1 bg-zinc-300 mx-auto mb-12 hidden md:block" />

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {level2.map((m) => (
                        <div key={m.id} className="bg-zinc-100 p-6 rounded-[30px] border-2 border-zinc-300 text-center hover:border-orange-600 transition">
                            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden grayscale hover:grayscale-0 transition duration-500">
                                <Image src={m.imageUrl} alt={m.firstname} fill className="object-cover" />
                            </div>
                            <h3 className="text-xl font-bold uppercase">{m.firstname} {m.lastname}</h3>
                            <p className="text-sm font-bold text-zinc-500 uppercase">{getRoleLabel(m.role[0] as MemberRole)}</p>
                        </div>
                    ))}
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {level3.map((m) => (
                        <div key={m.id} className="flex items-center gap-6 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                <Image src={m.imageUrl} alt={m.firstname} fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold uppercase leading-tight">{m.firstname} {m.lastname}</h4>
                                <p className="text-xs font-bold text-orange-600 uppercase">{getRoleLabel(m.role[0] as MemberRole)}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}