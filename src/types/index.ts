// Enums
export type TargetAudience = "all" | "subscribers" | "visitors";
export type MemberRole = "president" | "vice_president" | "secretaire" | "tresorier" | "technique" | "communication";
export type ArticleType = "sortie" | "realisation";

// Models
export type EventData = {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    target: TargetAudience;
    createdAt?: Date;
    updatedAt?: Date;
};

export type ArticleImage = {
    id: string;
    articleId: string;
    url: string;
};

export type Article = {
    id: string;
    title: string;
    content: string;
    type: ArticleType;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type MemberClub = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: Date;
};

export type Member = {
    id: string;
    firstname: string;
    lastname: string;
    role: MemberRole[];
    phone: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
};

export type MotoImage = {
    id: string;
    motoId: string;
    url: string;
};

export type Moto = {
    id: string;
    model: string;
    year: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};
