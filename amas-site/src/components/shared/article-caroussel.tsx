"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageItem {
    id: string;
    url: string;
}

export default function ArticleCaroussel({ images, title }: { images: ImageItem[], title: string}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (images.length === 0) return null;

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative group w-full max-w-[400px] mx-auto my-6">
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                <Image
                    src={images[currentIndex].url}
                    alt={`${title} - image ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                    priority={currentIndex === 0}
                />
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-[-50px] top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-black transition"
                        aria-label="Image précédente"
                    >
                        <ChevronLeft size={48} strokeWidth={1} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-[-50px] top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-black transition"
                        aria-label="Image suivante"
                    >
                        <ChevronRight size={48} strokeWidth={1} />
                    </button>
                </>
            )}
        </div>
    );
}