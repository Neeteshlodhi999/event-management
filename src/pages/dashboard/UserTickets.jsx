import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const isFinished = (date) => date && new Date(`${date}T23:59:59+05:30`).getTime() < Date.now();

function EventReview({ ticket, existingReview, onSaved }) {
  const [rating, setRating] = useState(existingReview?.rating || 5);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => { setRating(existingReview?.rating || 5); setComment(existingReview?.comment || ""); }, [existingReview]);

  async function save(event) {
    event.preventDefault();
    setLoading(true); setMessage("");
    try {
      const response = await fetch(`${API}/reviews`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ eventId: ticket.event._id, rating, comment }) });
      const result = await response.json();
      if (!response.ok || !result.status) throw new Error(result.message || "Unable to save review.");
      setMessage("Your review has been saved.");
      onSaved(result.data.review);
    } catch (error) { setMessage(error.message || "Unable to save review."); } finally { setLoading(false); }
  }

  return <form onSubmit={save} className="mt-4 border-t border-white/10 pt-4"><p className="font-semibold">{existingReview ? "Update your review" : "Rate this event"}</p><div className="flex gap-2 my-3">{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" onClick={() => setRating(star)} aria-label={`${star} stars`} className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-slate-600"}`}>★</button>)}</div><textarea value={comment} onChange={(event) => setComment(event.target.value)} maxLength="500" placeholder="Share your experience (optional)" rows="2" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm"/><div className="flex justify-between gap-3 mt-3"><span className={`text-sm ${message.includes("saved") ? "text-green-400" : "text-red-400"}`}>{message}</span><button disabled={loading} className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-xl font-bold disabled:opacity-60">{loading ? "Saving..." : existingReview ? "Update review" : "Submit review"}</button></div></form>;
}

export default function UserTickets() {
  const [tickets, setTickets] = useState([]), [reviews, setReviews] = useState([]), [error, setError] = useState("");
  const token = localStorage.getItem("accessToken");
  const load = async () => {
    try {
      const [bookingResponse, reviewResponse] = await Promise.all([fetch(`${API}/bookings?limit=100`, { headers: { Authorization: `Bearer ${token}` } }), fetch(`${API}/reviews/mine`, { headers: { Authorization: `Bearer ${token}` } })]);
      const [bookingResult, reviewResult] = await Promise.all([bookingResponse.json(), reviewResponse.json()]);
      if (!bookingResponse.ok || !bookingResult.status) throw new Error(bookingResult.message || "Unable to load tickets.");
      setTickets(bookingResult.data);
      if (reviewResponse.ok && reviewResult.status) setReviews(reviewResult.data);
    } catch (loadError) { setError(loadError.message || "Unable to load tickets."); }
  };
  useEffect(() => { load(); }, []);
  const cancel = async (id) => { if (!confirm("Cancel this booking?")) return; const r = await fetch(`${API}/bookings/${id}`, { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }), j = await r.json(); if (!r.ok || !j.status) setError(j.message); else load(); };
  const saveReview = (review) => setReviews((current) => [...current.filter((item) => String(item.event) !== String(review.event)), review]);

  return <section className="bg-white/5 border border-white/10 rounded-3xl p-8"><h2 className="text-2xl font-bold mb-6">My Tickets</h2>{error && <p className="text-red-400 mb-4">{error}</p>}<div className="space-y-4">{tickets.map((ticket) => { const invalid = ticket.isCancel || ticket.event?.isCancel; const finished = isFinished(ticket.event?.date); const existingReview = reviews.find((review) => String(review.event) === String(ticket.event?._id)); return <div key={ticket._id} className="bg-slate-900 rounded-2xl p-5"><div className="flex flex-col sm:flex-row justify-between gap-4"><div><h3 className="text-xl font-bold">{ticket.event?.title || "Event"}</h3><p className="text-slate-400">{ticket.event?.date} · {ticket.event?.venue}</p><p className="text-cyan-300 capitalize mt-2">{ticket.ticket_type} · {ticket.booked_tickets} ticket(s) · ₹{ticket.total_ticket_amount}</p></div><div className="flex gap-3 items-center">{invalid ? <span className="text-red-400 font-semibold">{ticket.event?.isCancel ? "Event Cancelled" : "Booking Cancelled"}</span> : <><Link to={`/dashboard/ticket?id=${ticket._id}`} className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-xl">View Ticket</Link>{!finished && <button onClick={() => cancel(ticket._id)} className="bg-red-500/20 text-red-300 px-4 py-2 rounded-xl">Cancel Booking</button>}</>}</div></div>{!invalid && finished && ticket.event?._id && <EventReview ticket={ticket} existingReview={existingReview} onSaved={saveReview} />}</div>; })}{!tickets.length && !error && <p className="text-slate-400">You have no tickets yet.</p>}</div></section>;
}
