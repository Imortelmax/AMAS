import { prisma } from "@/lib/db";

type MotoWithImages = {
    id: string;
    model: string;
    year: number;
    description: string;
    images: { id: string; url: string }[];
};

export default async function MotosPage() {
    const motos: MotoWithImages[] = await prisma.moto.findMany({
        orderBy: { createdAt: "desc" },
        include: { images: true },
    });

    return (
        <main className="pt-22 px-4">
            <div className="max-w-4xl mx-auto text-center bg-zinc-100 p-6 border-2 rounded-2xl">
                <h1 className="text-4xl text-center font-bold mb-4">Nos motos</h1>

                <div>
                    {motos.map((moto) => (
                        <article key={moto.id} className="p-3 pt-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                <div className="w-full sm:w-[320px] shrink-0">
                                    {moto.images[0] && (
                                        <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-zinc-200">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={moto.images[0].url}
                                                alt={moto.model}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                    <p className="mt-1 font-medium">{moto.model} ({moto.year})</p>
                                </div>
                                <p className="p-2 text-left">{moto.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}