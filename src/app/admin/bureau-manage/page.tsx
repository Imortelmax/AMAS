import { prisma } from "@/lib/db";
import BureauTable from "./BureauTable";
import type { MemberRole } from "@/types";
import type { Member } from "@/types";

type MemberWithTypedRole = Omit<Member, "role"> & { role: MemberRole[] };

export default async function BureauManagePage() {
    const members = await prisma.member.findMany({
        orderBy: { createdAt: "asc" },
    });

    return <BureauTable members={members as MemberWithTypedRole[]} />;
}
