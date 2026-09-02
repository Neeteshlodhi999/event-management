import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCalendarAlt,
    FaGoogle,
    FaGithub,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();
            if (!response.ok || !result.status) throw new Error(result.message || "Unable to log in.");
            if (result.data.role !== "admin") throw new Error("This account is not an admin account.");
            localStorage.setItem("adminAccessToken", result.data.accessToken);
            localStorage.setItem("adminUser", JSON.stringify(result.data));
            navigate("/");
        } catch (err) {
            setError(err.message || "Unable to log in.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5 relative overflow-hidden">
            {/* Background Blur Effects */}

            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

            {/* Login Card */}

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}

                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/30">
                        <FaCalendarAlt className="text-white text-3xl" />
                    </div>

                    <h1 className="text-4xl font-black text-white">
                        EventHub Admin
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Sign in to manage your events
                    </p>
                </div>

                {/* Form */}

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email */}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>

                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                                <input
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500 transition"
                                />
                            </div>
                        </div>

                        {/* Password */}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-cyan-500 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember */}

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-3 text-sm text-slate-400">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-cyan-500"
                                />

                                Remember Me
                            </label>

                            <button
                                type="button"
                                className="text-cyan-400 hover:text-cyan-300 text-sm"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {error && <p className="text-sm text-red-400">{error}</p>}

                        {/* Login Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 hover:bg-cyan-400 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02]"
                        >
                            {loading ? "Logging in..." : "Login to Dashboard"}
                        </button>
                    </form>

                    {/* Divider */}

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10" />

                        <span className="text-slate-500 text-sm">
                            OR
                        </span>

                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Social Login */}

                    <div className="grid grid-cols-2 gap-4">
                        <button className="text-white bg-slate-900 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-3 hover:border-cyan-500 transition">
                            <FaGoogle />
                            Google
                        </button>

                        <button className="text-white bg-slate-900 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-3 hover:border-cyan-500 transition">
                            <FaGithub />
                            GitHub
                        </button>
                    </div>
                </div>

                {/* Footer */}

                <p className="text-center text-slate-500 text-sm mt-6">
                    © 2026 EventHub Admin Dashboard
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
