import { prisma } from "@/lib/db";

export default async function MotosPage() {
    const motos = await prisma.moto.findMany({
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
                            <div className="flex">
                                <div>
                                    {moto.images[0] && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={moto.images[0].url}
                                            alt={moto.model}
                                            width={400}
                                            height={300}
                                            className="justify-center mx-auto rounded-lg object-cover"
                                        />
                                    )}
                                    <p>{moto.model} ({moto.year})</p>
                                </div>
                                <p className="p-4 max-w-xl">{moto.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}