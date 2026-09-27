import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function UserTickets() {
  const [tickets, setTickets] = useState([]), [error, setError] = useState("");
  const token = localStorage.getItem("accessToken");
  const load = () => fetch(`${API}/bookings?limit=100`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()).then((j) => j.status ? setTickets(j.data) : setError(j.message)).catch(() => setError("Unable to load tickets."));
  useEffect(load, []);
  const cancel = async (id) => { if (!confirm("Cancel this booking?")) return; const r = await fetch(`${API}/bookings/${id}`, { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }), j = await r.json(); if (!r.ok || !j.status) setError(j.message); else load(); };

  return <section className="bg-white/5 border border-white/10 rounded-3xl p-8"><h2 className="text-2xl font-bold mb-6">My Tickets</h2>{error && <p className="text-red-400 mb-4">{error}</p>}<div className="space-y-4">{tickets.map((ticket) => { const invalid = ticket.isCancel || ticket.event?.isCancel; return <div key={ticket._id} className="bg-slate-900 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4"><div><h3 className="text-xl font-bold">{ticket.event?.title || "Event"}</h3><p className="text-slate-400">{ticket.event?.date} · {ticket.event?.venue}</p><p className="text-cyan-300 capitalize mt-2">{ticket.ticket_type} · {ticket.booked_tickets} ticket(s) · ₹{ticket.total_ticket_amount}</p></div><div className="flex gap-3 items-center">{invalid ? <span className="text-red-400 font-semibold">{ticket.event?.isCancel ? "Event Cancelled" : "Booking Cancelled"}</span> : <><Link to={`/dashboard/ticket?id=${ticket._id}`} className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-xl">View Ticket</Link><button onClick={() => cancel(ticket._id)} className="bg-red-500/20 text-red-300 px-4 py-2 rounded-xl">Cancel Booking</button></>}</div></div>; })}{!tickets.length && !error && <p className="text-slate-400">You have no tickets yet.</p>}</div></section>;
}
