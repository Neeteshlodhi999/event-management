import { Resend } from "resend";

export async function sendPasswordResetEmail({ to, resetUrl, resetCode }) {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("Password reset email is not configured yet");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.EMAIL_FROM || "EventHub <onboarding@resend.dev>";
    const safeUrl = resetUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

    const { error } = await resend.emails.send({
        from,
        to,
        subject: "Reset your EventHub password",
        text: `You requested a password reset for EventHub.\n\nOpen this link within one hour:\n${resetUrl}\n\nIf the link does not open, visit the EventHub reset page and enter this code: ${resetCode}\n\nIf you did not request this, you can ignore this email.`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.5;color:#172033;max-width:560px;margin:auto">
            <h2>Reset your EventHub password</h2>
            <p>You requested a password reset for EventHub.</p>
            <p style="margin:28px 0">
              <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#06b6d4;color:#ffffff;padding:14px 22px;border-radius:8px;font-weight:700;text-decoration:none">
                Reset password
              </a>
            </p>
            <p>This link expires in one hour.</p>
            <p style="font-size:13px;color:#475569">If the button does not open, use this one-time code on the EventHub reset page:</p>
            <p style="font-size:28px;letter-spacing:6px;font-weight:700;color:#0f172a">${resetCode}</p>
            <p style="font-size:13px;color:#475569">You can also copy this link into Chrome:</p>
            <p style="font-size:12px;overflow-wrap:anywhere"><a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a></p>
            <p style="font-size:13px;color:#475569">If you did not request this, you can ignore this email.</p>
          </div>`
    });
    if (error) throw new Error(error.message || "Unable to send reset email");
}
