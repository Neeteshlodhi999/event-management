import { useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault(); setError(""); setMessage(""); setLoading(true);
    try {
      const response = await fetch(`${API}/users/forgot-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const result = await response.json();
      if (!response.ok || !result.status) throw Error(result.message || "Unable to send reset email.");
      setMessage("If an account exists, a reset link has been sent. Check your inbox.");
    } catch (err) { setError(err.message || "Unable to send reset email."); } finally { setLoading(false); }
  };

  return <section className="pt-32 pb-20 px-6 min-h-screen text-white"><form onSubmit={submit} className="max-w-md mx-auto glass rounded-3xl p-8 space-y-6"><div><h1 className="text-3xl font-black">Forgot password?</h1><p className="text-slate-400 mt-2">Enter your account email and we will send a reset link.</p></div><label className="block text-sm">Email address<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full bg-slate-900 rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-cyan-400" /></label>{message && <p className="text-green-400 text-sm">{message}</p>}{error && <p className="text-red-400 text-sm">{error}</p>}<button disabled={loading} className="w-full bg-cyan-500 disabled:opacity-60 py-3 rounded-xl font-bold">{loading ? "Sending..." : "Send reset link"}</button><Link to="/auth" className="block text-center text-cyan-400">Back to login</Link></form></section>;
}
