"use client";

import { useRef, useState } from "react";

type Props = {
    folder: string;
    multiple?: boolean;
    accept?: string;
    onUploaded: (urls: string[]) => void;
    label?: string;
};

export default function FileUpload({
    folder,
    multiple = false,
    accept = "image/*",
    onUploaded,
    label,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleFiles(files: FileList) {
        setUploading(true);
        setError(null);
        const urls: string[] = [];

        try {
            for (const file of Array.from(files)) {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        filename: file.name,
                        contentType: file.type,
                        size: file.size,
                        folder,
                    }),
                });

                if (!res.ok) {
                    const { error } = await res.json();
                    throw new Error(error ?? "Erreur upload");
                }

                const { presignedUrl, publicUrl } = await res.json();

                await fetch(presignedUrl, {
                    method: "PUT",
                    headers: { "Content-Type": file.type },
                    body: file,
                });

                urls.push(publicUrl);
            }

            onUploaded(urls);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Erreur lors de l'upload");
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="w-full py-3 border-2 border-dashed border-zinc-300 rounded-xl text-sm font-black uppercase text-zinc-400 hover:border-black hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {uploading ? "Upload en cours..." : (label ?? "+ Ajouter un fichier")}
            </button>
            {error && <p className="text-red-600 text-xs font-bold mt-1">{error}</p>}
        </div>
    );
}
