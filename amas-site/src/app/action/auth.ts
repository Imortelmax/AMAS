"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function login(formData: FormData) {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/admin/dashboard",
        });
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Identifiants invalides.";
                default:
                    return "Une erreur est survenue. Veuillez réessayer.";
            }
        }
        return "Une erreur inattendue est survenue.";
    };
}