import React from 'react'
import { Link } from 'react-router'

export default function Events() {
    return (
        <>
            {/* ================= HERO ================= */}
            <section className="relative pt-36 pb-20 overflow-hidden">
                <div className="hero-glow glow-left" />
                <div className="hero-glow glow-right" />
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <p className="uppercase tracking-[5px] text-cyan-400 text-sm mb-5">
                            Discover &amp; Explore
                        </p>
                        <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                            Find Your Next
                            <span className="gradient-text block">Favorite Event</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            Search concerts, startup summits, AI conferences, gaming tournaments,
                            workshops, and premium experiences.
                        </p>
                    </div>
                    {/* Search Box */}
                    <div className="max-w-6xl mx-auto mt-14 glass rounded-4xl p-5">
                        <div className="grid lg:grid-cols-5 gap-4">
                            {/* Search */}
                            <div className="lg:col-span-2 glass rounded-2xl px-5 h-14 flex items-center">
                                <i className="fa-solid fa-magnifying-glass text-cyan-400" />
                                <input
                                    type="text"
                                    placeholder="Search events, artists, locations..."
                                    className="bg-transparent outline-none w-full px-4 text-white placeholder-gray-500"
                                />
                            </div>
                            {/* Category */}
                            <div className="glass rounded-2xl px-5 h-14 flex items-center justify-between">
                                <span className="text-gray-400">Category</span>
                                <i className="fa-solid fa-angle-down text-cyan-400" />
                            </div>
                            {/* Event Type */}
                            <div className="glass rounded-2xl px-5 h-14 flex items-center justify-between">
                                <span className="text-gray-400">Event Type</span>
                                <i className="fa-solid fa-angle-down text-cyan-400" />
                            </div>
                            {/* Button */}
                            <button className="h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition font-bold text-lg shadow-lg shadow-cyan-500/20">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* ================= QUICK STATS ================= */}
            <section className="pb-16 px-6">
                <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl">
                                <i className="fa-solid fa-calendar-check" />
                            </div>
                            <span className="text-cyan-400 text-sm">+24%</span>
                        </div>
                        <h3 className="text-3xl font-black mb-2">500+</h3>
                        <p className="text-gray-400">Total Events</p>
                    </div>
                    <div className="glass rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center text-2xl">
                                <i className="fa-solid fa-play" />
                            </div>
                            <span className="text-green-400 text-sm">Live</span>
                        </div>
                        <h3 className="text-3xl font-black mb-2">45</h3>
                        <p className="text-gray-400">Ongoing Events</p>
                    </div>
                    <div className="glass rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl">
                                <i className="fa-solid fa-clock" />
                            </div>
                            <span className="text-purple-400 text-sm">Upcoming</span>
                        </div>
                        <h3 className="text-3xl font-black mb-2">120</h3>
                        <p className="text-gray-400">Upcoming Events</p>
                    </div>
                    <div className="glass rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-2xl">
                                <i className="fa-solid fa-users" />
                            </div>
                            <span className="text-pink-400 text-sm">Active</span>
                        </div>
                        <h3 className="text-3xl font-black mb-2">120K</h3>
                        <p className="text-gray-400">Active Users</p>
                    </div>
                </div>
            </section>
            {/* ================= FILTERS ================= */}
            <section className="pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-black mb-3">
                                Browse <span className="gradient-text">Events</span>
                            </h2>
                            <p className="text-gray-400">
                                Explore trending, upcoming, and ongoing events.
                            </p>
                        </div>
                        <button className="hidden md:flex items-center gap-3 glass px-5 py-3 rounded-2xl hover:border-cyan-400 transition">
                            <i className="fa-solid fa-sliders text-cyan-400" />
                            Advanced Filters
                        </button>
                    </div>
                    {/* Filter Tabs */}
                    <div className="flex gap-4 overflow-x-auto custom-scroll pb-2">
                        <button className="bg-cyan-500 whitespace-nowrap px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-cyan-500/20">
                            All Events
                        </button>
                        <button className="glass hover:border-green-400 transition whitespace-nowrap px-6 py-3 rounded-2xl font-semibold">
                            Ongoing Events
                        </button>
                        <button className="glass hover:border-purple-400 transition whitespace-nowrap px-6 py-3 rounded-2xl font-semibold">
                            Upcoming Events
                        </button>
                        <button className="glass hover:border-pink-400 transition whitespace-nowrap px-6 py-3 rounded-2xl font-semibold">
                            Featured Events
                        </button>
                        <button className="glass hover:border-yellow-400 transition whitespace-nowrap px-6 py-3 rounded-2xl font-semibold">
                            Music
                        </button>
                        <button className="glass hover:border-cyan-400 transition whitespace-nowrap px-6 py-3 rounded-2xl font-semibold">
                            Tech
                        </button>
                        <button className="glass hover:border-orange-400 transition whitespace-nowrap px-6 py-3 rounded-2xl font-semibold">
                            Business
                        </button>
                    </div>
                </div>
            </section>
            {/* ================= UPCOMING EVENTS ================= */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl md:text-4xl font-black">
                            Upcoming <span className="gradient-text">Events</span>
                        </h2>
                        <a href="#" className="text-cyan-400 hover:text-cyan-300">
                            View All
                        </a>
                    </div>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {/* Card */}
                        <div className="event-card glass rounded-3xl overflow-hidden">
                            <div className="relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop"
                                    className="w-full h-64 object-cover hover:scale-110 transition duration-700"
                                    alt=""
                                />
                                <div className="absolute top-5 left-5 bg-purple-500 px-4 py-2 rounded-full text-xs font-bold">
                                    Upcoming
                                </div>
                            </div>
                            <div className="p-7">
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-gray-400 text-sm">
                                        <i className="fa-solid fa-calendar mr-2 text-purple-400" />
                                        28 May 2026
                                    </span>
                                    <span className="text-purple-400 text-sm">Tech</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">
                                    AI &amp; Tech Conference
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Learn AI, machine learning, automation, and future technologies.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-xs">Ticket Price</p>
                                        <h4 className="text-2xl font-black text-purple-400">₹1499</h4>
                                    </div>
                                    <Link to="/events/details" className="bg-purple-500 hover:bg-purple-400 transition px-5 py-3 rounded-xl font-semibold">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="event-card glass rounded-3xl overflow-hidden">
                            <div className="relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop"
                                    className="w-full h-64 object-cover hover:scale-110 transition duration-700"
                                    alt=""
                                />
                                <div className="absolute top-5 left-5 bg-pink-500 px-4 py-2 rounded-full text-xs font-bold">
                                    Music
                                </div>
                            </div>
                            <div className="p-7">
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-gray-400 text-sm">
                                        <i className="fa-solid fa-location-dot mr-2 text-pink-400" />
                                        Goa
                                    </span>
                                    <span className="text-pink-400 text-sm">Festival</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Summer Music Festival</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Experience beach vibes, EDM nights, and live performances.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-xs">Ticket Price</p>
                                        <h4 className="text-2xl font-black text-pink-400">₹1999</h4>
                                    </div>
                                    <button className="bg-pink-500 hover:bg-pink-400 transition px-5 py-3 rounded-xl font-semibold">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="event-card glass rounded-3xl overflow-hidden">
                            <div className="relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
                                    className="w-full h-64 object-cover hover:scale-110 transition duration-700"
                                    alt=""
                                />
                                <div className="absolute top-5 left-5 bg-green-500 px-4 py-2 rounded-full text-xs font-bold">
                                    Live
                                </div>
                            </div>
                            <div className="p-7">
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-gray-400 text-sm">
                                        <i className="fa-solid fa-location-dot mr-2 text-green-400" />
                                        Mumbai
                                    </span>
                                    <span className="text-green-400 text-sm">Gaming</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Gaming Championship</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Compete with professional gamers in esports tournaments.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-xs">Ticket Price</p>
                                        <h4 className="text-2xl font-black text-green-400">₹799</h4>
                                    </div>
                                    <button className="bg-green-500 hover:bg-green-400 transition px-5 py-3 rounded-xl font-semibold">
                                        Join Live
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ================= NEWSLETTER ================= */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto glass rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="hero-glow glow-left opacity-50" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            Never Miss
                            <span className="gradient-text">An Event</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                            Subscribe to get updates about upcoming concerts, conferences,
                            workshops, and premium experiences.
                        </p>
                        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
                            <div className="glass rounded-2xl h-14 px-5 flex items-center flex-1">
                                <i className="fa-solid fa-envelope text-cyan-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="bg-transparent outline-none w-full px-4 text-white placeholder-gray-500"
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