import React from 'react'

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">

                <div className="hero-glow-1"></div>
                <div className="hero-glow-2"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left  */}
                    <div>
                        <p className="uppercase tracking-[5px] text-cyan-400 text-sm mb-5">
                            Premium Event Experience
                        </p>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
                            Discover Amazing
                            <span className="gradient-text block mt-2">Events Nearby</span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8">
                            Explore concerts, conferences, workshops, startup meetups,
                            cultural festivals, gaming events, and more with a modern
                            event management platform.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                className="bg-cyan-500 hover:bg-cyan-400 transition px-7 py-4 rounded-2xl font-semibold shadow-xl shadow-cyan-500/30">
                                Browse Events
                            </button>

                            <button
                                className="border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition px-7 py-4 rounded-2xl font-semibold">
                                Learn More
                            </button>
                        </div>

                        {/* Stats  */}
                        <div className="grid grid-cols-3 gap-4 mt-12">

                            <div className="glass rounded-2xl p-5 text-center">
                                <h3 className="text-3xl font-bold text-cyan-400">500+</h3>
                                <p className="text-gray-400 mt-2 text-sm">Events</p>
                            </div>

                            <div className="glass rounded-2xl p-5 text-center">
                                <h3 className="text-3xl font-bold text-purple-400">120K</h3>
                                <p className="text-gray-400 mt-2 text-sm">Visitors</p>
                            </div>

                            <div className="glass rounded-2xl p-5 text-center">
                                <h3 className="text-3xl font-bold text-pink-400">80+</h3>
                                <p className="text-gray-400 mt-2 text-sm">Cities</p>
                            </div>

                        </div>
                    </div>

                    {/* Right */}
                    <div className="relative">

                        <div className="glass rounded-[32px] overflow-hidden shadow-2xl shadow-cyan-500/10 relative">

                            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"
                                alt="Event Banner" className="w-full h-[420px] md:h-[600px] object-cover" />

                            <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-5">
                                <div className="flex items-center justify-between gap-4">

                                    <div>
                                        <h3 className="text-2xl font-bold">Music Festival 2026</h3>
                                        <p className="text-gray-300 mt-2 text-sm">
                                            <i className="fa-solid fa-location-dot text-cyan-400 mr-2"></i>
                                            Mumbai, India
                                        </p>
                                    </div>

                                    <button
                                        className="min-w-[56px] h-14 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition flex items-center justify-center">
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Categories */}
            <section id="categories" className="py-24 px-6">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Event <span className="gradient-text">Categories</span>
                        </h2>

                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Browse all categories including technology, entertainment,
                            startup networking, workshops, gaming, and live music events.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div
                            className="glass rounded-3xl p-8 text-center hover:border-cyan-400 transition duration-300 hover:-translate-y-2">
                            <div
                                className="w-20 h-20 mx-auto rounded-2xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 text-3xl mb-6">
                                <i className="fa-solid fa-music"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Music</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Concerts, DJ nights, live performances, and festivals.
                            </p>
                        </div>

                        <div
                            className="glass rounded-3xl p-8 text-center hover:border-purple-400 transition duration-300 hover:-translate-y-2">
                            <div
                                className="w-20 h-20 mx-auto rounded-2xl bg-purple-500/15 flex items-center justify-center text-purple-400 text-3xl mb-6">
                                <i className="fa-solid fa-code"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Tech</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                AI events, hackathons, coding contests, and workshops.
                            </p>
                        </div>

                        <div
                            className="glass rounded-3xl p-8 text-center hover:border-pink-400 transition duration-300 hover:-translate-y-2">
                            <div
                                className="w-20 h-20 mx-auto rounded-2xl bg-pink-500/15 flex items-center justify-center text-pink-400 text-3xl mb-6">
                                <i className="fa-solid fa-briefcase"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Business</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Startup networking, seminars, and entrepreneurship summits.
                            </p>
                        </div>

                        <div
                            className="glass rounded-3xl p-8 text-center hover:border-yellow-400 transition duration-300 hover:-translate-y-2">
                            <div
                                className="w-20 h-20 mx-auto rounded-2xl bg-yellow-500/15 flex items-center justify-center text-yellow-400 text-3xl mb-6">
                                <i className="fa-solid fa-film"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Entertainment</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Cultural programs, comedy nights, movies, and shows.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Events */}
            <section id="events" className="py-24 px-6">

                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">

                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Trending <span className="gradient-text">Events</span>
                            </h2>

                            <p className="text-gray-400">
                                Explore the most popular events happening this month.
                            </p>
                        </div>

                        <button
                            className="border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white transition px-6 py-3 rounded-2xl font-semibold">
                            View All Events
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                        {/* Card  */}
                        <div className="event-card glass rounded-3xl overflow-hidden">

                            <div className="overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
                                    alt="Startup Event"
                                    className="w-full h-64 object-cover hover:scale-110 transition duration-700" />

                                <div
                                    className="absolute top-5 left-5 bg-cyan-500 px-4 py-2 rounded-full text-xs font-semibold tracking-wide">
                                    Featured
                                </div>
                            </div>

                            <div className="p-7">

                                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-5">
                                    <span>
                                        <i className="fa-solid fa-calendar text-cyan-400 mr-2"></i>
                                        25 May 2026
                                    </span>

                                    <span>
                                        <i className="fa-solid fa-location-dot text-cyan-400 mr-2"></i>
                                        Delhi
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold mb-4">
                                    Startup Growth Summit
                                </h3>

                                <p className="text-gray-400 leading-relaxed mb-7 text-sm">
                                    Meet founders, investors, and entrepreneurs at India's leading startup event.
                                </p>

                                <div className="flex items-center justify-between gap-4">

                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Starting From</p>
                                        <h4 className="text-2xl font-bold text-cyan-400">₹999</h4>
                                    </div>

                                    <button
                                        className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 rounded-xl font-semibold whitespace-nowrap">
                                        Book Now
                                    </button>

                                </div>
                            </div>
                        </div>

                        {/* Card */}
                        <div className="event-card glass rounded-3xl overflow-hidden">

                            <div className="overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop"
                                    alt="AI Event" className="w-full h-64 object-cover hover:scale-110 transition duration-700" />
                            </div>

                            <div className="p-7">

                                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-5">
                                    <span>
                                        <i className="fa-solid fa-calendar text-purple-400 mr-2"></i>
                                        28 May 2026
                                    </span>

                                    <span>
                                        <i className="fa-solid fa-location-dot text-purple-400 mr-2"></i>
                                        Bangalore
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold mb-4">
                                    AI & Tech Conference
                                </h3>

                                <p className="text-gray-400 leading-relaxed mb-7 text-sm">
                                    Learn AI, robotics, automation, and future technology trends.
                                </p>

                                <div className="flex items-center justify-between gap-4">

                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Starting From</p>
                                        <h4 className="text-2xl font-bold text-purple-400">₹1499</h4>
                                    </div>

                                    <button
                                        className="bg-purple-500 hover:bg-purple-400 transition px-5 py-3 rounded-xl font-semibold whitespace-nowrap">
                                        Book Now
                                    </button>

                                </div>
                            </div>
                        </div>

                        {/* Card  */}
                        <div className="event-card glass rounded-3xl overflow-hidden md:col-span-2 xl:col-span-1">

                            <div className="overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop"
                                    alt="Music Festival"
                                    className="w-full h-64 object-cover hover:scale-110 transition duration-700" />
                            </div>

                            <div className="p-7">

                                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-5">
                                    <span>
                                        <i className="fa-solid fa-calendar text-pink-400 mr-2"></i>
                                        30 May 2026
                                    </span>

                                    <span>
                                        <i className="fa-solid fa-location-dot text-pink-400 mr-2"></i>
                                        Goa
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold mb-4">
                                    Summer Music Festival
                                </h3>

                                <p className="text-gray-400 leading-relaxed mb-7 text-sm">
                                    Enjoy beach vibes, EDM nights, and live performances.
                                </p>

                                <div className="flex items-center justify-between gap-4">

                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Starting From</p>
                                        <h4 className="text-2xl font-bold text-pink-400">₹1999</h4>
                                    </div>

                                    <button
                                        className="bg-pink-500 hover:bg-pink-400 transition px-5 py-3 rounded-xl font-semibold whitespace-nowrap">
                                        Book Now
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}