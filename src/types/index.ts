export type TargetAudience = "all" | "subscribers" | "visitors";

export type MemberRole = "president" | "vice_president" | "secretaire" | "tresorier" | "technique" | "communication";

export type ArticleType = "sortie" | "realisation";

export type EventData = {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    target: TargetAudience;
};
