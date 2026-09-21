import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ message: '', error: false });
    const [sending, setSending] = useState(false);

    async function sendMessage(event) {
        event.preventDefault();
        setSending(true);
        setStatus({ message: '', error: false });
        try {
            const response = await fetch(`${API_URL}/contact-messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            if (!response.ok || !result.status) throw new Error(result.message || 'Unable to send your message.');
            setForm({ name: '', email: '', subject: '', message: '' });
            setStatus({ message: 'Thank you. Your message has been sent to EventHub.', error: false });
        } catch (error) {
            setStatus({ message: error.message || 'Unable to send your message.', error: true });
        } finally {
            setSending(false);
        }
    }

    return (
        <>
            {/* ================= HERO ================= */}
            <section className="relative pt-36 pb-20 overflow-hidden">
                <div className="hero-glow glow-left" />
                <div className="hero-glow glow-right" />
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <p className="uppercase tracking-[5px] text-cyan-400 text-sm mb-5">
                            Contact EventHub
                        </p>
                        <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                            Let’s Build Amazing
                            <span className="gradient-text block">Event Experiences</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            Have questions about tickets, events, partnerships, or support? Our
                            team is here to help you anytime.
                        </p>
                    </div>
                </div>
            </section>
            {/* ================= CONTACT SECTION ================= */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
                    {/* ================= LEFT INFO ================= */}
                    <div className="space-y-8">
                        {/* Card */}
                        <div className="glass rounded-3xl p-8">
                            <div className="flex items-start gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl">
                                    <i className="fa-solid fa-location-dot" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Office Address</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        221B Event Street, Tech Business Park, Mumbai, Maharashtra,
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="glass rounded-3xl p-8">
                            <div className="flex items-start gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl">
                                    <i className="fa-solid fa-envelope" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Email Support</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        support@eventhub.com
                                        <br />
                                        partnership@eventhub.com
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="glass rounded-3xl p-8">
                            <div className="flex items-start gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-2xl">
                                    <i className="fa-solid fa-phone" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Call Us</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        +91 98765 43210
                                        <br />
                                        +91 98765 12345
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Social */}
                        <div className="glass rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                            <div className="flex items-center gap-4">
                                <a
                                    href="#"
                                    className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-cyan-500 transition"
                                >
                                    <i className="fa-brands fa-facebook-f" />
                                </a>
                                <a
                                    href="#"
                                    className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-pink-500 transition"
                                >
                                    <i className="fa-brands fa-instagram" />
                                </a>
                                <a
                                    href="#"
                                    className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-sky-500 transition"
                                >
                                    <i className="fa-brands fa-twitter" />
                                </a>
                                <a
                                    href="#"
                                    className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-purple-500 transition"
                                >
                                    <i className="fa-brands fa-linkedin-in" />
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* ================= CONTACT FORM ================= */}
                    <div className="glass rounded-[40px] p-8 md:p-10 relative overflow-hidden">
                        <div className="hero-glow glow-right opacity-40" />
                        <div className="relative z-10">
                            <div className="mb-10">
                                <h3 className="text-4xl font-black mb-4">
                                    Send A<span className="gradient-text">Message</span>
                                </h3>
                                <p className="text-gray-400">
                                    Fill out the form below and our team will contact you soon.
                                </p>
                            </div>
                            {/* Form */}
                            <form className="space-y-6" onSubmit={sendMessage}>
                                {/* Name */}
                                <div>
                                    <label className="text-sm text-gray-300 block mb-3">
                                        Full Name
                                    </label>
                                    <div className="glass rounded-2xl h-14 px-5 flex items-center">
                                        <i className="fa-solid fa-user text-cyan-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            required
                                            value={form.name}
                                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                                            className="bg-transparent w-full px-4 text-white placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                                {/* Email */}
                                <div>
                                    <label className="text-sm text-gray-300 block mb-3">
                                        Email Address
                                    </label>
                                    <div className="glass rounded-2xl h-14 px-5 flex items-center">
                                        <i className="fa-solid fa-envelope text-cyan-400" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                            value={form.email}
                                            onChange={(event) => setForm({ ...form, email: event.target.value })}
                                            className="bg-transparent w-full px-4 text-white placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                                {/* Subject */}
                                <div>
                                    <label className="text-sm text-gray-300 block mb-3">
                                        Subject
                                    </label>
                                    <div className="glass rounded-2xl h-14 px-5 flex items-center">
                                        <i className="fa-solid fa-tag text-cyan-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter subject"
                                            required
                                            value={form.subject}
                                            onChange={(event) => setForm({ ...form, subject: event.target.value })}
                                            className="bg-transparent w-full px-4 text-white placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                                {/* Message */}
                                <div>
                                    <label className="text-sm text-gray-300 block mb-3">
                                        Message
                                    </label>
                                    <div className="glass rounded-2xl p-5">
                                        <textarea
                                            rows={6}
                                            placeholder="Write your message..."
                                            required
                                            value={form.message}
                                            onChange={(event) => setForm({ ...form, message: event.target.value })}
                                            className="bg-transparent w-full text-white placeholder-gray-500 resize-none"
                                        />
                                    </div>
                                </div>
                                {/* Button */}
                                <button disabled={sending} className="w-full h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 transition font-bold text-lg shadow-xl shadow-cyan-500/20">
                                    {sending ? 'Sending Message...' : 'Send Message'}
                                </button>
                                {status.message && <p className={status.error ? 'text-red-400 text-center' : 'text-emerald-400 text-center'}>{status.message}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* ================= FAQ SECTION ================= */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl md:text-5xl font-black mb-5">
                            Frequently Asked
                            <span className="gradient-text">Questions</span>
                        </h2>
                        <p className="text-gray-400">
                            Common questions about tickets, support, and events.
                        </p>
                    </div>
                    <div className="space-y-6">
                        {/* FAQ */}
                        <div className="glass rounded-3xl p-6 flex items-start justify-between gap-5">
                            <div>
                                <h3 className="text-xl font-bold mb-3">
                                    How can I book an event ticket?
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    You can easily book tickets from the events page using the “Book
                                    Now” button.
                                </p>
                            </div>
                            <i className="fa-solid fa-plus text-cyan-400 mt-2" />
                        </div>
                        {/* FAQ */}
                        <div className="glass rounded-3xl p-6 flex items-start justify-between gap-5">
                            <div>
                                <h3 className="text-xl font-bold mb-3">
                                    Can I organize my own event?
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Yes, EventHub allows organizers to create and manage their own
                                    events.
                                </p>
                            </div>
                            <i className="fa-solid fa-plus text-purple-400 mt-2" />
                        </div>
                        {/* FAQ */}
                        <div className="glass rounded-3xl p-6 flex items-start justify-between gap-5">
                            <div>
                                <h3 className="text-xl font-bold mb-3">
                                    How do I contact support?
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    You can use the contact form or email our support team directly.
                                </p>
                            </div>
                            <i className="fa-solid fa-plus text-pink-400 mt-2" />
                        </div>
                    </div>
                </div>
            </section>
            {/* ================= NEWSLETTER ================= */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto glass rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="hero-glow glow-left opacity-40" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            Stay Updated With
                            <span className="gradient-text">EventHub</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                            Subscribe to get updates about upcoming concerts, festivals,
                            workshops, and conferences.
                        </p>
                        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
                            <div className="glass rounded-2xl h-14 px-5 flex items-center flex-1">
                                <i className="fa-solid fa-envelope text-cyan-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent w-full px-4 text-white placeholder-gray-500"
                                />
                            </div>
                            <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 h-14 rounded-2xl font-bold shadow-lg shadow-cyan-500/20">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
