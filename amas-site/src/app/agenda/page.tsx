import { prisma } from "@/lib/db";
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format, 
  addMonths, 
  subMonths 
} from "date-fns";
import { fr } from "date-fns/locale";
import CalendarRow from "@/components/shared/calendar-row";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; year?: string }>;
}) {
    const resolvedParams = await searchParams;
    // 1. Déterminer la date affichée (par défaut maintenant)
    const now = new Date();

    const currentMonth = resolvedParams.month ? parseInt(resolvedParams.month) : now.getMonth();
    const currentYear = resolvedParams.year ? parseInt(resolvedParams.year) : now.getFullYear();
    
    const displayedDate = new Date(currentYear, currentMonth, 1);
    
    // 2. Calculer les dates pour la navigation
    const prevMonthDate = subMonths(displayedDate, 1);
    const nextMonthDate = addMonths(displayedDate, 1);

    // 3. Générer les jours du mois
    const days = eachDayOfInterval({
        start: startOfMonth(displayedDate),
        end: endOfMonth(displayedDate),
    });

    // 4. Récupérer les events
    const events = await prisma.event.findMany({
        where: {
        date: {
            gte: startOfMonth(displayedDate),
            lte: endOfMonth(displayedDate),
        },
        },
    });

    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-2">Agenda</h1>
                
                {/* AFFICHAGE DU MOIS (Style Maquette) */}
                <div className="mb-8">
                    <p className="text-xl capitalize font-medium mb-2">
                        {format(displayedDate, "MMMM yyyy", { locale: fr })}
                    </p>
                    
                    {/* NAVIGATION */}
                    <div className="flex items-center justify-center gap-8">
                        <Link 
                            href={`/agenda?month=${prevMonthDate.getMonth()}&year=${prevMonthDate.getFullYear()}`}
                            className="hover:scale-110 transition"
                        >
                            <div className="flex items-center gap-2">
                                <ChevronLeft /> {/* Ligne gauche maquette */}
                                <span className="capitalize text-sm">{format(prevMonthDate, "MMMM", { locale: fr })}</span>
                            </div>
                        </Link>

                        <Link 
                            href={`/agenda?month=${nextMonthDate.getMonth()}&year=${nextMonthDate.getFullYear()}`}
                            className="hover:scale-110 transition transition flex items-center gap-2"
                        >
                            <div className="flex items-center gap-2">
                                <span className="capitalize text-sm">
                                    {format(nextMonthDate, "MMMM", { locale: fr })}
                                </span>
                                <ChevronRight /> {/* Ligne droite maquette */}
                            </div>
                        </Link>
                    </div>
                </div>

                {/* STRUCTURE DU CALENDRIER */}
                <div className="bg-[#D9D9D9] rounded-[40px] overflow-hidden shadow-2xl border-4 border-zinc-400">
                    <div className="grid grid-cols-[150px_1fr] border-b-2 border-zinc-400 font-bold bg-zinc-200">
                        <div className="py-4 border-r-2 border-zinc-400">Date</div>
                        <div className="py-4 text-white">Événement</div>
                    </div>

                    {days.map((day) => {
                        const dayEvents = events.filter(
                            (e) => format(e.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                        );
                        return (
                            <CalendarRow 
                                key={day.toString()} 
                                day={day} 
                                events={dayEvents} 
                            />
                        );
                    })}
                </div>
            </div>
        </main>
    );
}