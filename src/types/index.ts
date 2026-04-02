export type TargetAudience = "all" | "subscribers" | "visitors";

export type EventData = {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    target: TargetAudience;
};
