import { Resend } from "resend";

export async function sendPasswordResetEmail({ to, resetUrl }) {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("Password reset email is not configured yet");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.EMAIL_FROM || "EventHub <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
        from,
        to,
        subject: "Reset your EventHub password",
        text: `You requested a password reset. Open this link within one hour: ${resetUrl}`,
        html: `<p>You requested a password reset for EventHub.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in one hour. If you did not request it, you can ignore this email.</p>`
    });
    if (error) throw new Error(error.message || "Unable to send reset email");
}
