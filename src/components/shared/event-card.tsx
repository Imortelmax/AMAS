import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
    title: string;
    date: Date;
    location: string;
    description: string;
    imageUrl?: string | null;
}

export default function EventCard({ title, date, location, description, imageUrl }: EventCardProps) {
    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

    return (
    <div className="bg-white text-black overflow-hidden shadow-xl transition-transform hover:scale-[1.02]">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 text-amas-orange font-bold text-sm uppercase tracking-widest mb-2">
          <Calendar size={16} />
          {formattedDate}
        </div>
        <h3 className="text-2xl font-black mb-3 uppercase leading-tight">{title}</h3>
        <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
          <MapPin size={16} />
          {location}
        </div>
        <p className="text-zinc-600 line-clamp-2 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <button className="w-full bg-black text-white font-bold py-3 uppercase text-xs tracking-[0.2em] hover:bg-amas-orange transition">
          S'inscrire
        </button>
      </div>
    </div>
  );
}