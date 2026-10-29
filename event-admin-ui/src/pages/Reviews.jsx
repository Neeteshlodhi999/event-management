import { useEffect, useMemo, useState } from "react";
import { FaStar, FaSyncAlt } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Reviews() {
  const [reviews, setReviews] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState("");
  const token = localStorage.getItem("adminAccessToken");
  const load = async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`${API}/reviews/admin`, { headers: { Authorization: `Bearer ${token}` } });
      const result = await response.json();
      if (!response.ok || !result.status) throw new Error(result.message || "Unable to load reviews.");
      setReviews(result.data);
    } catch (loadError) { setError(loadError.message || "Unable to load reviews."); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const average = useMemo(() => reviews.length ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1) : "0.0", [reviews]);

  return <div className="space-y-7"><div className="flex flex-col sm:flex-row justify-between gap-4"><div><h1 className="text-4xl font-black">Ratings & Reviews</h1><p className="text-slate-400 mt-2">Feedback from attendees after your events.</p></div><button onClick={load} disabled={loading} className="bg-slate-800 px-5 py-3 rounded-xl font-semibold flex gap-2 items-center"><FaSyncAlt className={loading ? "animate-spin" : ""} /> Refresh</button></div><div className="grid sm:grid-cols-2 gap-5"><div className="bg-white/5 border border-white/10 rounded-3xl p-6"><p className="text-slate-400">Total Reviews</p><p className="text-4xl font-black mt-2 text-cyan-300">{reviews.length}</p></div><div className="bg-white/5 border border-white/10 rounded-3xl p-6"><p className="text-slate-400">Average Rating</p><p className="text-4xl font-black mt-2 text-yellow-400 flex gap-2 items-center">{average} <FaStar className="text-2xl" /></p></div></div>{error && <p className="text-red-400">{error}</p>}<div className="space-y-4">{reviews.map((review) => <article key={review._id} className="bg-white/5 border border-white/10 rounded-3xl p-6"><div className="flex flex-col sm:flex-row sm:justify-between gap-3"><div><h2 className="text-xl font-bold">{review.event?.title || "Event"}</h2><p className="text-slate-400 text-sm">{review.user?.name || "Attendee"} · {review.user?.email || ""}</p></div><div className="text-yellow-400 font-bold">{"★".repeat(review.rating)}<span className="text-slate-600">{"★".repeat(5 - review.rating)}</span></div></div>{review.comment ? <p className="text-slate-300 mt-4">{review.comment}</p> : <p className="text-slate-500 mt-4">No written comment.</p>}<p className="text-xs text-slate-500 mt-4">{new Date(review.createdAt).toLocaleDateString()}</p></article>)}{!reviews.length && !loading && <p className="text-center text-slate-400 py-12">No attendee reviews yet.</p>}</div></div>;
}
