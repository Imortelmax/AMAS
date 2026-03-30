import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    providers: [],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");

            if (isOnAdmin) {
                if (nextUrl.pathname === "/login") return true;
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
    },
};
