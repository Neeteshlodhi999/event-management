import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const fallbackImage = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop';

export default function Home() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/events?limit=6`)
            .then(async (response) => {
                const result = await response.json();
                if (!response.ok || !result.status) throw new Error(result.message || 'Unable to load events.');
                return result.data;
            })
            .then((data) => setEvents(data.filter((event) => !event.isCancel)))
            .catch(() => setError('Events are temporarily unavailable. Please try again shortly.'));
    }, []);

    const featured = events[0];
    const categories = useMemo(() => new Set(events.map((event) => event.category).filter(Boolean)).size, [events]);

    return <>
        <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
            <div className="hero-glow-1" /><div className="hero-glow-2" />
            <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <p className="uppercase tracking-[5px] text-cyan-400 text-sm mb-5">Premium Event Experience</p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">Discover Amazing<span className="gradient-text block mt-2">Events Nearby</span></h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8">Explore live events created by organizers, reserve your tickets, and keep every plan in one place.</p>
                    <div className="flex flex-wrap gap-4"><Link to="/events" className="bg-cyan-500 hover:bg-cyan-400 transition px-7 py-4 rounded-2xl font-semibold shadow-xl shadow-cyan-500/30">Browse Events</Link><a href="#events" className="border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition px-7 py-4 rounded-2xl font-semibold">See Latest Events</a></div>
                    <div className="grid grid-cols-3 gap-4 mt-12">
                        <Stat value={events.length} label="Live Events" color="text-cyan-400" />
                        <Stat value={categories} label="Categories" color="text-purple-400" />
                        <Stat value={events.reduce((total, event) => total + Number(event.total_general_tickets || 0) + Number(event.total_premium_tickets || 0), 0)} label="Tickets" color="text-pink-400" />
                    </div>
                </div>
                <div className="relative"><div className="glass rounded-[32px] overflow-hidden shadow-2xl shadow-cyan-500/10 relative"><img src={featured?.thumbnail || fallbackImage} alt={featured?.title || 'Event banner'} className="w-full h-[420px] md:h-[600px] object-cover" /><div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-5 flex items-center justify-between gap-4"><div><h2 className="text-2xl font-bold">{featured?.title || 'Your next great event'}</h2><p className="text-gray-300 mt-2 text-sm"><i className="fa-solid fa-location-dot text-cyan-400 mr-2" />{featured?.venue || 'Create an event from the admin dashboard'}</p></div>{featured && <Link to={`/events/details?id=${featured._id}`} className="min-w-[56px] h-14 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition flex items-center justify-center"><i className="fa-solid fa-arrow-right" /></Link>}</div></div></div>
            </div>
        </section>

        <section id="categories" className="py-24 px-6"><div className="max-w-7xl mx-auto"><div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold mb-4">Explore <span className="gradient-text">Categories</span></h2><p className="text-gray-400 max-w-2xl mx-auto">Every category comes directly from events published by your organizers.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{(categories ? [...new Set(events.map((event) => event.category))] : ['Music', 'Technology', 'Business', 'Entertainment']).slice(0, 4).map((category, index) => <Link key={category} to="/events" className="glass rounded-3xl p-8 text-center hover:border-cyan-400 transition duration-300 hover:-translate-y-2"><div className="w-20 h-20 mx-auto rounded-2xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 text-3xl mb-6"><i className={['fa-solid fa-music', 'fa-solid fa-code', 'fa-solid fa-briefcase', 'fa-solid fa-film'][index] || 'fa-solid fa-calendar'} /></div><h3 className="text-2xl font-bold mb-3">{category}</h3><p className="text-gray-400 text-sm">Browse upcoming {category.toLowerCase()} events.</p></Link>)}</div></div></section>

        <section id="events" className="py-24 px-6"><div className="max-w-7xl mx-auto"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"><div><h2 className="text-4xl md:text-5xl font-bold mb-4">Latest <span className="gradient-text">Events</span></h2><p className="text-gray-400">Published events from EventHub organizers.</p></div><Link to="/events" className="border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white transition px-6 py-3 rounded-2xl font-semibold">View All Events</Link></div>{error && <p className="text-red-400 mb-6">{error}</p>}<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">{events.slice(0, 3).map((event) => <article key={event._id} className="event-card glass rounded-3xl overflow-hidden"><div className="overflow-hidden"><img src={event.thumbnail || fallbackImage} alt={event.title} className="w-full h-64 object-cover hover:scale-110 transition duration-700" /></div><div className="p-7"><div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-5"><span><i className="fa-solid fa-calendar text-cyan-400 mr-2" />{event.date}</span><span><i className="fa-solid fa-location-dot text-cyan-400 mr-2" />{event.venue}</span></div><h3 className="text-2xl font-bold mb-3">{event.title}</h3><p className="text-gray-400 leading-relaxed mb-7 text-sm line-clamp-2">{event.desc}</p><div className="flex items-center justify-between gap-4"><div><p className="text-gray-500 text-xs mb-1">Starting From</p><h4 className="text-2xl font-bold text-cyan-400">₹{event.general_tickets_price}</h4></div><Link to={`/events/details?id=${event._id}`} className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 rounded-xl font-semibold whitespace-nowrap">Book Now</Link></div></div></article>)}</div>{!events.length && !error && <p className="text-center text-slate-400 py-12">No events have been published yet. Check back soon.</p>}</div></section>
    </>;
}

function Stat({ value, label, color }) { return <div className="glass rounded-2xl p-5 text-center"><h3 className={`text-3xl font-bold ${color}`}>{value}</h3><p className="text-gray-400 mt-2 text-sm">{label}</p></div>; }
