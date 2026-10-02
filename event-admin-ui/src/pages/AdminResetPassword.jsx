import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminResetPassword() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setError("");

        if (!token) {
            setError("This reset link is invalid.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/users/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const result = await response.json();
            if (!response.ok || !result.status) {
                throw new Error(result.message || "Unable to reset password.");
            }
            setMessage("Password changed. Redirecting to admin login...");
            setTimeout(() => navigate("/admin/login"), 1500);
        } catch (requestError) {
            setError(requestError.message || "Unable to reset password.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center px-5 text-white">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-black">Set admin password</h1>
                    <p className="text-slate-400 mt-2">Choose a new password with at least 6 characters.</p>
                </div>
                <label className="block text-sm text-slate-300">
                    New password
                    <input type="password" required minLength="6" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400" />
                </label>
                <label className="block text-sm text-slate-300">
                    Confirm new password
                    <input type="password" required minLength="6" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400" />
                </label>
                {message && <p role="status" className="text-emerald-400 text-sm">{message}</p>}
                {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}
                <button disabled={loading} className="w-full bg-cyan-500 disabled:opacity-60 py-3 rounded-xl font-bold">
                    {loading ? "Saving..." : "Reset password"}
                </button>
                <Link to="/admin/login" className="block text-center text-cyan-400">Back to admin login</Link>
            </form>
        </main>
    );
}
