import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Auth() {
    const [loginPage, setLoginPage] = useState(true);
    const navigate = useNavigate();
    return (
        <>
            {/* login section */}
            <div className="pt-28 pb-20 text-white min-h-screen flex items-center justify-center px-6 py-10 relative">
                {/* Background Glow */}
                <div className="glow-1" />
                <div className="glow-2" />
                {/* login section */}
                <div className="relative z-10 w-full max-w-4xl grid lg:grid-cols-2 overflow-hidden rounded-[25px] shadow-2xl shadow-cyan-500/10 glass">
                    {/* Left Side */}
                    <div className="hidden lg:flex flex-col justify-center p-14 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-purple-500/10" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                    <i className="fa-solid fa-calendar-days text-white text-xl" />
                                </div>
                                <h1 className="text-4xl font-black">
                                    Event<span className="text-cyan-400">Hub</span>
                                </h1>
                            </div>
                            <h2 className="text-5xl font-black leading-tight mb-6">
                                Manage &amp;
                                <span className="gradient-text block">Explore Events</span>
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-10">
                                Discover concerts, startup meetups, workshops, AI conferences,
                                festivals, gaming tournaments, and premium live events.
                            </p>
                            {/* Features */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                        <i className="fa-solid fa-ticket" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Easy Ticket Booking</h3>
                                        <p className="text-gray-400 text-sm">
                                            Book and manage tickets instantly.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                                        <i className="fa-solid fa-music" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Premium Events</h3>
                                        <p className="text-gray-400 text-sm">
                                            Access trending and exclusive events.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                                        <i className="fa-solid fa-users" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Community Access</h3>
                                        <p className="text-gray-400 text-sm">
                                            Connect with creators and attendees.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className="p-8 md:p-14">
                        {/* Top Buttons */}
                        <div className="flex items-center justify-center mb-10">
                            <div className="glass p-2 rounded-2xl flex gap-2">
                                <button onClick={() => setLoginPage(true)} className={`${loginPage ? "bg-cyan-500 text-white" : ""} px-8 py-3 rounded-xl font-semibold hover:shadow-lg text-gray-300 hover:shadow-cyan-500/20 hover:text-white transition`}>
                                    Login
                                </button>
                                <button onClick={() => setLoginPage(false)} className={`${!loginPage ? "bg-cyan-500 text-white" : ""} px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/20 text-gray-300 hover:text-white transition`}>
                                    Register
                                </button>
                            </div>
                        </div>
                        {/* Login Form */}
                        {loginPage ? <Login navigate={navigate} />
                            : <Register onRegistered={() => setLoginPage(true)} />}
                    </div>
                </div>
            </div>
        </>
    )
}


function Login({ navigate }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await response.json();

            if (!response.ok || !result.status || !result.data?.accessToken) {
                throw new Error(result.message || 'Unable to log in.');
            }

            localStorage.setItem('accessToken', result.data.accessToken);
            localStorage.setItem('user', JSON.stringify(result.data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message === 'Failed to fetch'
                ? 'Server is not running. Start the project with: npm run start:project'
                : (err.message || 'Unable to log in.'));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="max-w-md mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black mb-3">Welcome Back 👋</h2>
                    <p className="text-gray-400">
                        Login to continue exploring amazing events.
                    </p>
                </div>
                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-300 mb-2 block">
                            Email Address
                        </label>
                        <div className="glass rounded-2xl flex items-center px-5 h-14">
                            <i className="fa-solid fa-envelope text-cyan-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={(event) => setForm({ ...form, email: event.target.value })}
                                required
                                className="bg-transparent w-full px-4 text-white placeholder-gray-500 focus:outline-0"
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-300 mb-2 block">
                            Password
                        </label>
                        <div className="glass rounded-2xl flex items-center px-5 h-14">
                            <i className="fa-solid fa-lock text-cyan-400" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={(event) => setForm({ ...form, password: event.target.value })}
                                required
                                className="bg-transparent w-full px-4 text-white placeholder-gray-500 focus:outline-0"
                            />
                            <i className="fa-solid fa-eye text-gray-500 cursor-pointer" />
                        </div>
                    </div>
                    {/* Options */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-400">
                            <input type="checkbox" className="accent-cyan-500" />
                            Remember Me
                        </label>
                        <a href="#" className="text-cyan-400 hover:text-cyan-300">
                            Forgot Password?
                        </a>
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    {/* Login Button */}
                    <button disabled={loading} className="w-full h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 transition font-bold text-lg shadow-xl shadow-cyan-500/30">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-gray-500 text-sm">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>
                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="glass h-14 rounded-2xl hover:border-cyan-400 transition flex items-center justify-center gap-3">
                        <i className="fa-brands fa-google text-red-400" />
                        Google
                    </button>
                    <button className="glass h-14 rounded-2xl hover:border-blue-400 transition flex items-center justify-center gap-3">
                        <i className="fa-brands fa-facebook-f text-blue-400" />
                        Facebook
                    </button>
                </div>
            </div>
        </>
    )
}

function Register({ onRegistered }) {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            if (!response.ok || !result.status) throw new Error(result.message || 'Unable to register.');

            setSuccess('Account created. You can now log in.');
            setTimeout(onRegistered, 1200);
        } catch (err) {
            setError(err.message === 'Failed to fetch'
                ? 'Server is not running. Start the project with: npm run start:project'
                : (err.message || 'Unable to register.'));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="max-w-md mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black mb-3">Welcome Back 👋</h2>
                    <p className="text-gray-400">
                        Register to continue exploring amazing events.
                    </p>
                </div>
                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* username */}
                    <div>
                        <label className="text-sm text-gray-300 mb-2 block">
                            User Name
                        </label>
                        <div className="glass rounded-2xl flex items-center px-5 h-14">
                            <i className="fa-solid fa-envelope text-cyan-400" />
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                required
                                className="bg-transparent w-full px-4 text-white placeholder-gray-500 focus:outline-0"
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-300 mb-2 block">
                            Email Address
                        </label>
                        <div className="glass rounded-2xl flex items-center px-5 h-14">
                            <i className="fa-solid fa-envelope text-cyan-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={(event) => setForm({ ...form, email: event.target.value })}
                                required
                                className="bg-transparent w-full px-4 text-white placeholder-gray-500 focus:outline-0"
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-300 mb-2 block">
                            Password
                        </label>
                        <div className="glass rounded-2xl flex items-center px-5 h-14">
                            <i className="fa-solid fa-lock text-cyan-400" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={(event) => setForm({ ...form, password: event.target.value })}
                                required
                                className="bg-transparent w-full px-4 text-white placeholder-gray-500 focus:outline-0"
                            />
                            <i className="fa-solid fa-eye text-gray-500 cursor-pointer" />
                        </div>
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    {success && <p className="text-sm text-emerald-400">{success}</p>}
                    {/* register Button */}
                    <button disabled={loading} className="w-full h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 transition font-bold text-lg shadow-xl shadow-cyan-500/30">
                        {loading ? 'Creating account...' : 'Register Here...'}
                    </button>
                </form>
                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-gray-500 text-sm">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>
                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="glass h-14 rounded-2xl hover:border-cyan-400 transition flex items-center justify-center gap-3">
                        <i className="fa-brands fa-google text-red-400" />
                        Google
                    </button>
                    <button className="glass h-14 rounded-2xl hover:border-blue-400 transition flex items-center justify-center gap-3">
                        <i className="fa-brands fa-facebook-f text-blue-400" />
                        Facebook
                    </button>
                </div>
            </div>
        </>
    )
}
