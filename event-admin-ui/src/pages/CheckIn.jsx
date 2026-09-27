import { useState } from "react";
import { FaCheckCircle, FaQrcode } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function CheckIn() {
  const [bookingId, setBookingId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("adminAccessToken");

  const checkIn = async (event) => {
    event.preventDefault();
    if (!bookingId.trim()) return setError("Enter the booking ID from the attendee's ticket.");
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch(`${API}/bookings/check-in/${bookingId.trim()}`, { method: "PATCH", headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (!response.ok || !data.status) throw Error(data.message || "Unable to check in this ticket.");
      setResult(data.data); setBookingId("");
    } catch (err) {
      setError(err.message || "Unable to check in this ticket.");
    } finally { setLoading(false); }
  };

  return <div className="max-w-3xl space-y-7"><div><h1 className="text-4xl font-black">Attendee Check-in</h1><p className="text-slate-400 mt-2">Paste the booking ID or scan the attendee's QR ticket into the field. A ticket can be checked in only once.</p></div><form onSubmit={checkIn} className="bg-white/5 border border-white/10 rounded-3xl p-7 space-y-5"><label className="block"><span className="font-semibold">Booking ID or QR scan</span><div className="flex flex-col sm:flex-row gap-3 mt-2"><input value={bookingId} onChange={(event) => setBookingId(event.target.value)} placeholder="Paste booking ID or scan QR here" className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400" /><button disabled={loading} className="bg-cyan-500 disabled:opacity-60 px-6 py-3 rounded-xl font-bold flex justify-center items-center gap-2"><FaQrcode />{loading ? "Checking..." : "Check In"}</button></div></label></form>{error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-2xl p-5">{error}</div>}{result && <section className="bg-green-500/10 border border-green-500/30 rounded-3xl p-7"><div className="flex gap-4"><FaCheckCircle className="text-green-400 text-3xl mt-1" /><div><h2 className="text-2xl font-bold text-green-300">Check-in successful</h2><p className="text-slate-300 mt-2"><b>{result.attendee?.name || "Attendee"}</b> is checked in for <b>{result.event?.title}</b>.</p><p className="text-slate-400 mt-2 capitalize">{result.ticket_type} · {result.booked_tickets} ticket(s)</p><p className="text-slate-400 text-sm mt-1">{result.attendee?.email || ""}</p></div></div></section>}</div>;
}
