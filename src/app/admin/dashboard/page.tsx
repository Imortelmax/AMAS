import { prisma } from "@/lib/db";
import Link from "next/link";
import { Calendar, Users, FileText, UserCircle } from "lucide-react";

export default async function DashboardPage() {
    const [memberCount, eventCount, articleCount, bureauCount, upcomingEvents] = await Promise.all([
        prisma.memberClub.count(),
        prisma.event.count(),
        prisma.article.count({ where: { published: true } }),
        prisma.member.count(),
        prisma.event.findMany({
            where: { date: { gte: new Date() } },
            orderBy: { date: "asc" },
            take: 3,
        }),
    ]);

    const stats = [
        { label: "Membres du club", value: memberCount, icon: Users, href: "/admin/membres" },
        { label: "Événements", value: eventCount, icon: Calendar, href: "/admin/agenda" },
        { label: "Articles publiés", value: articleCount, icon: FileText, href: "/admin/articles" },
        { label: "Membres du bureau", value: bureauCount, icon: UserCircle, href: "/admin/bureau-manage" },
    ];

    return (
        <div>
            <h1 className="text-4xl font-black uppercase mb-8">Vue d&apos;ensemble</h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="bg-white p-6 rounded-2xl border-2 border-zinc-200 hover:border-black transition-all group"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">{stat.label}</p>
                            <stat.icon size={18} className="text-zinc-300 group-hover:text-orange-600 transition-colors" />
                        </div>
                        <p className="text-5xl font-black">{stat.value}</p>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <Link
                    href="/admin/agenda"
                    className="flex items-center gap-4 p-6 bg-black text-white rounded-2xl hover:bg-orange-600 transition-all group"
                >
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="font-black uppercase">Créer un événement</p>
                        <p className="text-xs text-white/60 font-bold">Ajouter à l&apos;agenda</p>
                    </div>
                </Link>
                <Link
                    href="/admin/articles"
                    className="flex items-center gap-4 p-6 bg-black text-white rounded-2xl hover:bg-orange-600 transition-all group"
                >
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="font-black uppercase">Créer un article</p>
                        <p className="text-xs text-white/60 font-bold">Sortie ou réalisation</p>
                    </div>
                </Link>
            </div>

            <div>
                <h2 className="text-xl font-black uppercase mb-4">Prochains événements</h2>
                {upcomingEvents.length === 0 ? (
                    <div className="bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-2xl p-8 text-center">
                        <p className="text-zinc-400 font-bold">Aucun événement à venir</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {upcomingEvents.map((event) => (
                            <Link
                                key={event.id}
                                href={`/admin/agenda/${event.id}`}
                                className="flex items-center justify-between p-5 bg-white border-2 border-zinc-200 rounded-2xl hover:border-black transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-black text-white rounded-xl p-3 text-center min-w-[56px]">
                                        <p className="text-xs font-black uppercase leading-none">
                                            {new Date(event.date).toLocaleDateString("fr-FR", { month: "short" })}
                                        </p>
                                        <p className="text-2xl font-black leading-tight">
                                            {new Date(event.date).getDate()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-black">{event.title}</p>
                                        <p className="text-sm text-zinc-500 font-bold">{event.location}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-400 font-bold">
                                    {new Date(event.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
