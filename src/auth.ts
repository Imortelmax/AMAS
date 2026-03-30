import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");

            if (isOnAdmin) {
                if (nextUrl.pathname === "/admin/login") return true;
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
    },
});