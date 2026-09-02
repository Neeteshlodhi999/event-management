import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function SavedEvents() {
  const [saved, setSaved] = useState([]), [error, setError] = useState("");
  const token = localStorage.getItem("accessToken");
  const load = () => fetch(`${API}/saved-events`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(j => j.status ? setSaved(j.data) : setError(j.message)).catch(() => setError("Unable to load saved events."));
  useEffect(load, []);
  const remove = async (id) => { const r = await fetch(`${API}/saved-events/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }), j = await r.json(); if (!r.ok || !j.status) setError(j.message); else load(); };
  return <section className="bg-white/5 border border-white/10 rounded-3xl p-8"><div className="flex items-center justify-between mb-8"><div><h3 className="text-2xl font-bold">Saved Events</h3><p className="text-slate-400 mt-1">Events you saved to revisit later.</p></div><FaHeart className="text-pink-400 text-2xl" /></div>{error && <p className="text-red-400 mb-5">{error}</p>}<div className="grid gap-5 md:grid-cols-2">{saved.map(item => { const event = item.event; if (!event) return null; return <article key={item._id} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden"><img src={event.thumbnail} alt="" className="w-full h-36 object-cover" /><div className="p-6"><h4 className="text-xl font-bold mb-4">{event.title}</h4><div className="space-y-3 text-slate-400"><p className="flex items-center gap-3"><FaCalendarAlt />{event.date} · {event.time}</p><p className="flex items-center gap-3"><FaMapMarkerAlt />{event.venue}</p></div><div className="flex gap-4 mt-6"><Link to={`/events/details?id=${event._id}`} className="text-cyan-400 font-semibold">View & Book</Link><button onClick={() => remove(event._id)} className="text-pink-400 font-semibold">Remove</button></div></div></article>; })}{!saved.length && !error && <p className="text-slate-400">You have not saved any events yet.</p>}</div></section>;
}
