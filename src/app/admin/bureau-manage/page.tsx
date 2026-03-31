import { prisma } from "@/lib/db";
import BureauTable from "./BureauTable";

export default async function BureauManagePage() {
    const members = await prisma.member.findMany({
        orderBy: { createdAt: "asc" },
    });

    return <BureauTable members={members} />;
}
