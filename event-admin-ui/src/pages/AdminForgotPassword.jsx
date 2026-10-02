import { useState } from "react";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/users/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            if (!response.ok || !result.status) {
                throw new Error(result.message || "Unable to request a password reset.");
            }
            setMessage("If an account exists for that email, a reset link has been sent.");
        } catch (requestError) {
            setError(requestError.message || "Unable to request a password reset.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center px-5 text-white">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-black">Reset admin password</h1>
                    <p className="text-slate-400 mt-2">Enter the email address for your admin account.</p>
                </div>
                <label className="block text-sm text-slate-300">
                    Email address
                    <input
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="mt-2 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                </label>
                {message && <p role="status" className="text-emerald-400 text-sm">{message}</p>}
                {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}
                <button disabled={loading} className="w-full bg-cyan-500 disabled:opacity-60 py-3 rounded-xl font-bold">
                    {loading ? "Sending..." : "Send reset link"}
                </button>
                <Link to="/admin/login" className="block text-center text-cyan-400">Back to admin login</Link>
            </form>
        </main>
    );
}
