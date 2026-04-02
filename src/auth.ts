import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const admin = await prisma.admin.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!admin) return null;

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string,
                    admin.password
                );

                if (!isPasswordCorrect) return null;

                return {
                    id: admin.id,
                    email: admin.email,
                };
            },
        }),
    ],
});
