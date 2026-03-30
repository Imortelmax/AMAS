"use client";

import { prisma } from "@/lib/db";
import { Pencil, Trash, Plus } from "lucide-react";

export default async function MembresPage() {
    const members = await prisma.memberClub.findMany({
        orderBy: { createdAt: "desc" },
    });

    const handleDelete = async (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
            await prisma.memberClub.delete({ where: { id } });
            // Rafraîchir la page ou mettre à jour l'état pour refléter la suppression
        }
    };

    return (
        <div>
            <div className="flex m-8">
                <h1 className="text-4xl font-black uppercase m-1">Membres du Club</h1>

                <button className="border rounded-lg bg-amas-orange hover:bg-navbar-bg hover:text-white ml-auto">
                    <Plus className="inline"/> Ajouter un membre
                </button>
            </div>

            <table className="w-full p-4">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">Nom</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Téléphone</th>
                        <th className="border border-gray-300 px-4 py-2">Date d'inscription</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.firstName} {member.lastName}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.createdAt.toLocaleDateString()}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="border p-2 rounded-lg hover:bg-gray-200">
                                    <Pencil  />
                                </button>
                                <button className="border p-2 rounded-lg hover:bg-red-200 ml-2">
                                    <Trash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
