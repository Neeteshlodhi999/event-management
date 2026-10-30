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

async function sendEventEmail({ to, subject, text, html }) {
    if (!process.env.RESEND_API_KEY || !to) return;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.EMAIL_FROM || "EventHub <onboarding@resend.dev>";
    const { error } = await resend.emails.send({ from, to, subject, text, html });
    if (error) throw new Error(error.message || "Unable to send event email");
}

export async function sendBookingConfirmationEmail({ to, name, event, booking }) {
    const eventDate = event.date ? new Date(`${event.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "To be announced";
    const ticketType = `${booking.ticket_type[0].toUpperCase()}${booking.ticket_type.slice(1)}`;

    return sendEventEmail({
        to,
        subject: `Booking confirmed: ${event.title}`,
        text: `Hello ${name}, your booking is confirmed.\n\nEvent: ${event.title}\nDate: ${eventDate}\nTime: ${event.time || "To be announced"}\nVenue: ${event.venue || "To be announced"}\nTickets: ${booking.booked_tickets} ${ticketType}\nAmount: ₹${booking.total_ticket_amount}\n\nYou can view your ticket in EventHub under My Tickets.`,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#172033;max-width:560px;margin:auto"><h2>Booking confirmed</h2><p>Hello ${name},</p><p>Your booking for <strong>${event.title}</strong> is confirmed.</p><div style="background:#f1f5f9;padding:16px;border-radius:8px"><p><strong>Date:</strong> ${eventDate}</p><p><strong>Time:</strong> ${event.time || "To be announced"}</p><p><strong>Venue:</strong> ${event.venue || "To be announced"}</p><p><strong>Tickets:</strong> ${booking.booked_tickets} ${ticketType}</p><p><strong>Amount:</strong> ₹${booking.total_ticket_amount}</p></div><p>Open EventHub and go to <strong>My Tickets</strong> to view your ticket.</p></div>`
    });
}

export async function sendEventCancellationEmail({ to, name, event }) {
    return sendEventEmail({
        to,
        subject: `Event cancelled: ${event.title}`,
        text: `Hello ${name},\n\nWe are sorry to let you know that ${event.title} has been cancelled. Please contact the organizer for support regarding your booking.`,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#172033;max-width:560px;margin:auto"><h2>Event cancelled</h2><p>Hello ${name},</p><p>We are sorry to let you know that <strong>${event.title}</strong> has been cancelled.</p><p>Please contact the organizer for further support regarding your booking.</p></div>`
    });
}
