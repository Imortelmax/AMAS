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
        <div className="relative group w-full max-w-[600px] mx-auto my-6">
            <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-zinc-200">
                <Image
                    src={images[currentIndex].url}
                    alt={`${title} - image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority={currentIndex === 0}
                />
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 md:left-[-50px] top-1/2 -translate-y-1/2 p-1 md:p-2 text-white md:text-zinc-400 bg-black/30 md:bg-transparent rounded-full md:rounded-none hover:text-black transition"
                        aria-label="Image précédente"
                    >
                        <ChevronLeft size={32} strokeWidth={1.5} className="md:w-12 md:h-12" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 md:right-[-50px] top-1/2 -translate-y-1/2 p-1 md:p-2 text-white md:text-zinc-400 bg-black/30 md:bg-transparent rounded-full md:rounded-none hover:text-black transition"
                        aria-label="Image suivante"
                    >
                        <ChevronRight size={32} strokeWidth={1.5} className="md:w-12 md:h-12" />
                    </button>
                </>
            )}
        </div>
    );
}