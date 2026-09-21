import { useEffect, useState } from "react";
import { FaEnvelopeOpen, FaInbox } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("adminAccessToken");

  useEffect(() => {
    fetch(`${API}/contact-messages`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.status) throw new Error(result.message || "Unable to load messages.");
        return result.data;
      })
      .then(setMessages)
      .catch((err) => setError(err.message));
  }, [token]);

  async function markRead(messageId) {
    try {
      const response = await fetch(`${API}/contact-messages/${messageId}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok || !result.status) throw new Error(result.message || "Unable to update message.");
      setMessages((current) => current.map((message) => message._id === messageId ? result.data : message));
    } catch (err) {
      setError(err.message);
    }
  }

  return <div className="max-w-5xl space-y-7">
    <div><h1 className="text-4xl font-black">Contact Messages</h1><p className="text-slate-400 mt-2">Messages sent from the public Contact Us page.</p></div>
    {error && <p className="text-red-400">{error}</p>}
    <div className="grid gap-5">{messages.map((message) => <article key={message._id} className={`border rounded-3xl p-6 ${message.isRead ? "bg-white/5 border-white/10" : "bg-cyan-500/10 border-cyan-400/40"}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4"><div><h2 className="text-xl font-bold">{message.subject}</h2><p className="text-cyan-300 mt-1">{message.name} · {message.email}</p><p className="text-slate-500 text-sm mt-1">{new Date(message.createdAt).toLocaleString()}</p></div>{!message.isRead && <button onClick={() => markRead(message._id)} className="bg-cyan-500 px-4 py-2 rounded-xl flex items-center gap-2"><FaEnvelopeOpen /> Mark read</button>}</div>
      <p className="text-slate-200 whitespace-pre-wrap mt-5 leading-relaxed">{message.message}</p>
    </article>)}{!messages.length && !error && <div className="text-center p-12 bg-white/5 border border-white/10 rounded-3xl"><FaInbox className="text-4xl text-cyan-400 mx-auto mb-4"/><p className="text-slate-400">No contact messages yet.</p></div>}</div>
  </div>;
}
