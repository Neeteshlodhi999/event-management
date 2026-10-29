import { Resend } from "resend";

export async function sendPasswordResetEmail({ to, resetCode }) {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("Password reset email is not configured yet");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.EMAIL_FROM || "EventHub <onboarding@resend.dev>";
    const { error } = await resend.emails.send({
        from,
        to,
        subject: "Reset your EventHub password",
        text: `Your EventHub password reset code is: ${resetCode}\n\nOpen the EventHub reset page and enter your email, this code, and your new password. The code expires in one hour. If you did not request this, you can ignore this email.`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.5;color:#172033;max-width:560px;margin:auto">
            <h2>Reset your EventHub password</h2>
            <p>You requested a password reset for EventHub.</p>
            <p style="font-size:13px;color:#475569">Use this one-time code on the EventHub reset page:</p>
            <p style="font-size:28px;letter-spacing:6px;font-weight:700;color:#0f172a">${resetCode}</p>
            <p>This code expires in one hour.</p>
            <p style="font-size:13px;color:#475569">If you did not request this, you can ignore this email.</p>
          </div>`
    });
    if (error) throw new Error(error.message || "Unable to send reset email");
}
