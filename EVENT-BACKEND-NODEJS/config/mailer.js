import nodemailer from "nodemailer";

export async function sendPasswordResetEmail({ to, resetUrl }) {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
        throw new Error("Password reset email is not configured yet");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || `EventHub <${user}>`,
        to,
        subject: "Reset your EventHub password",
        text: `You requested a password reset. Open this link within one hour: ${resetUrl}`,
        html: `<p>You requested a password reset for EventHub.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in one hour. If you did not request it, you can ignore this email.</p>`
    });
}
