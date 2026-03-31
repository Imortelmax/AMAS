export const CLOUDINARY_FOLDERS = {
    articles: "amas/articles",
    bureau: "amas/bureau",
    motos: "amas/motos",
} as const;

export const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
