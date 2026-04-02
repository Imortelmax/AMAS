"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
        await resend.emails.send({
            from: "AMAS Contact <onboarding@resend.dev>",
            to:"gauthier.watelain@epitech.eu",
            subject: `Nouveau message de contact de ${name}`,
            replyTo: email,
            text: `Message de ${name} (${email}):\n\n${message}`,
        });

        await resend.emails.send({
            from: "AMAS Association <onboarding@resend.dev>",
            to: email,
            subject: "Votre message a été reçu",
            text: `Bonjour ${name},\n\nMerci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nL'équipe AMAS`,
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}