import { useEffect, useState } from "react";
import { FaEnvelope, FaUsers } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]), [error, setError] = useState(""), [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminAccessToken");
  useEffect(() => { fetch(`${API}/subscribers`, { headers: { Authorization: `Bearer ${token}` } }).then(async (response) => { const result = await response.json(); if (!response.ok || !result.status) throw new Error(result.message || "Unable to load subscribers."); return result.data; }).then(setSubscribers).catch((err) => setError(err.message)).finally(() => setLoading(false)); }, [token]);
  return <div className="max-w-5xl space-y-7"><div><h1 className="text-4xl font-black">Newsletter Subscribers</h1><p className="text-slate-400 mt-2">People who subscribed from the public EventHub website.</p></div><div className="bg-cyan-500/10 border border-cyan-400/30 rounded-3xl p-6 flex gap-4 items-center"><FaUsers className="text-3xl text-cyan-300" /><div><b className="text-3xl">{subscribers.length}</b><p className="text-slate-400">Total subscribers</p></div></div>{error && <p className="text-red-400">{error}</p>}<div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"><table className="w-full text-left"><thead className="border-b border-white/10 text-slate-400"><tr><th className="p-4">Email address</th><th className="p-4">Subscribed on</th></tr></thead><tbody>{subscribers.map((subscriber) => <tr key={subscriber._id} className="border-b border-white/5"><td className="p-4 flex items-center gap-3"><FaEnvelope className="text-cyan-400" />{subscriber.email}</td><td className="p-4">{new Date(subscriber.createdAt).toLocaleString()}</td></tr>)}{!subscribers.length && !loading && <tr><td colSpan="2" className="p-8 text-center text-slate-400">No subscribers yet.</td></tr>}{loading && <tr><td colSpan="2" className="p-8 text-center text-slate-400">Loading subscribers...</td></tr>}</tbody></table></div></div>;
}
