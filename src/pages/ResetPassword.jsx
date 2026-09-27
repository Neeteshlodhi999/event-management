import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault(); setError(""); setMessage("");
    if (!token) return setError("This reset link is invalid.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    setLoading(true);
    try {
      const response = await fetch(`${API}/users/reset-password/${token}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const result = await response.json();
      if (!response.ok || !result.status) throw Error(result.message || "Unable to reset password.");
      setMessage("Password changed. Redirecting to login...");
      setTimeout(() => navigate("/auth"), 1500);
    } catch (err) { setError(err.message || "Unable to reset password."); } finally { setLoading(false); }
  };

  return <section className="pt-32 pb-20 px-6 min-h-screen text-white"><form onSubmit={submit} className="max-w-md mx-auto glass rounded-3xl p-8 space-y-6"><div><h1 className="text-3xl font-black">Set new password</h1><p className="text-slate-400 mt-2">Choose a new password with at least 6 characters.</p></div><label className="block text-sm">New password<input type="password" required minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full bg-slate-900 rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-cyan-400" /></label><label className="block text-sm">Confirm new password<input type="password" required minLength="6" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full bg-slate-900 rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-cyan-400" /></label>{message && <p className="text-green-400 text-sm">{message}</p>}{error && <p className="text-red-400 text-sm">{error}</p>}<button disabled={loading} className="w-full bg-cyan-500 disabled:opacity-60 py-3 rounded-xl font-bold">{loading ? "Saving..." : "Reset password"}</button><Link to="/auth" className="block text-center text-cyan-400">Back to login</Link></form></section>;
}
