import React from "react";
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaClock,
    FaUsers,
    FaTicketAlt,
    FaStar,
    FaShareAlt,
    FaHeart,
    FaCheckCircle,
    FaMusic,
    FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router";

export default function EventDetailsPage() {
    const navigate = useNavigate();
    return (
        <div className="relative pt-20 pb-1 overflow-hidden">
            <div className="min-h-screen bg-slate-950 text-white">
                {/* ================= HEADER ================= */}
                <header className="backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
                        <button onClick={()=>navigate(-1)} className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition">
                            <FaArrowLeft />
                            <span>Back to Events</span>
                        </button>

                        <div className="flex items-center gap-4 text-xs">
                            <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400 transition">
                                <FaHeart />
                            </button>

                            <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400 transition">
                                <FaShareAlt />
                            </button>
                        </div>
                    </div>
                </header>
                {/* ================= hero ================= */}
                <section className="relative">
                    <div className="h-137.5 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2000&auto=format&fit=crop"
                            alt="event"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="max-w-7xl mx-auto px-6 pb-10">
                            <div className="inline-flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
                                <FaStar />
                                Featured Event
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black mb-6">
                                Summer Music Festival 2026
                            </h1>

                            <div className="flex flex-wrap gap-6 text-slate-200">
                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-cyan-400" />
                                    <span>28 June 2026</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaClock className="text-cyan-400" />
                                    <span>04:00 PM - 11:00 PM</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-cyan-400" />
                                    <span>Goa Beach Arena, Goa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= CONTENT ================= */}

                <section className="py-16 px-6">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                        {/* ================= LEFT CONTENT ================= */}

                        <div className="lg:col-span-2 space-y-8">
                            {/* About Event */}

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                <h2 className="text-3xl font-bold mb-6">
                                    About This Event
                                </h2>

                                <p className="text-slate-400 leading-relaxed text-lg">
                                    Join thousands of music lovers at the biggest summer music
                                    festival of the year. Experience live performances from top
                                    international artists, DJs, and bands while enjoying an
                                    unforgettable atmosphere by the beach.
                                </p>

                                <p className="text-slate-400 leading-relaxed text-lg mt-5">
                                    The festival includes food zones, VIP lounges, interactive
                                    entertainment areas, merchandise stores, and exclusive artist
                                    meet-and-greet opportunities.
                                </p>
                            </div>

                            {/* Highlights */}

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                <h2 className="text-3xl font-bold mb-8">
                                    Event Highlights
                                </h2>

                                <div className="grid md:grid-cols-2 gap-5">
                                    {[
                                        "Live International Artists",
                                        "Beach Side Experience",
                                        "Food & Beverage Zones",
                                        "VIP Lounge Access",
                                        "Meet & Greet Sessions",
                                        "Free Merchandise"
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4"
                                        >
                                            <FaCheckCircle className="text-green-400 text-lg" />
                                            <span className="text-slate-300">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Event Schedule */}

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                <h2 className="text-3xl font-bold mb-8">
                                    Event Schedule
                                </h2>

                                <div className="space-y-5">
                                    {[
                                        {
                                            time: "04:00 PM",
                                            title: "Entry & Registration",
                                        },
                                        {
                                            time: "05:00 PM",
                                            title: "Opening Performance",
                                        },
                                        {
                                            time: "07:00 PM",
                                            title: "Main Artist Performance",
                                        },
                                        {
                                            time: "09:00 PM",
                                            title: "DJ Night",
                                        },
                                        {
                                            time: "11:00 PM",
                                            title: "Closing Ceremony",
                                        },
                                    ].map((schedule, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-5 items-start border-l-2 border-cyan-500 pl-5"
                                        >
                                            <div className="font-bold text-cyan-400 min-w-25">
                                                {schedule.time}
                                            </div>

                                            <div className="text-slate-300">
                                                {schedule.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gallery */}

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                <h2 className="text-3xl font-bold mb-8">
                                    Event Gallery
                                </h2>

                                <div className="grid md:grid-cols-3 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <img
                                            key={item}
                                            src={`https://picsum.photos/400/300?random=${item}`}
                                            alt=""
                                            className="rounded-2xl h-44 w-full object-cover hover:scale-105 transition duration-300"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ================= BOOKING SIDEBAR ================= */}

                        <div>
                            <div className="sticky top-24">
                                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                                    {/* Ticket Header */}

                                    <div className="bg-linear-to-r from-cyan-500 to-purple-600 p-6">
                                        <h3 className="text-2xl font-bold mb-2">
                                            Ticket Booking
                                        </h3>

                                        <p className="text-white/80">
                                            Reserve your seat now
                                        </p>
                                    </div>

                                    <div className="p-6">
                                        {/* Price */}

                                        <div className="mb-8">
                                            <p className="text-slate-400 text-sm">
                                                Starting From
                                            </p>

                                            <h2 className="text-5xl font-black text-cyan-400">
                                                ₹1,999
                                            </h2>
                                        </div>

                                        {/* Stats */}

                                        <div className="space-y-4 mb-8">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-3 text-slate-400">
                                                    <FaUsers />
                                                    Attendees
                                                </span>

                                                <span className="font-semibold">
                                                    2,500+
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-3 text-slate-400">
                                                    <FaTicketAlt />
                                                    Tickets Left
                                                </span>

                                                <span className="font-semibold text-green-400">
                                                    158
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-3 text-slate-400">
                                                    <FaMusic />
                                                    Category
                                                </span>

                                                <span className="font-semibold">
                                                    Music Festival
                                                </span>
                                            </div>
                                        </div>

                                        {/* Ticket Type */}

                                        <div className="space-y-4 mb-8">
                                            <h4 className="font-semibold">
                                                Ticket Types
                                            </h4>

                                            <div className="border border-cyan-500 bg-cyan-500/10 rounded-2xl p-4">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h5 className="font-bold">
                                                            General Pass
                                                        </h5>

                                                        <p className="text-sm text-slate-400">
                                                            Standard Entry
                                                        </p>
                                                    </div>

                                                    <span className="font-bold text-cyan-400">
                                                        ₹1,999
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="border border-white/10 rounded-2xl p-4">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h5 className="font-bold">
                                                            VIP Pass
                                                        </h5>

                                                        <p className="text-sm text-slate-400">
                                                            Lounge Access
                                                        </p>
                                                    </div>

                                                    <span className="font-bold">
                                                        ₹4,999
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity */}

                                        <div className="mb-8">
                                            <label className="block mb-3 text-sm text-slate-400">
                                                Quantity
                                            </label>

                                            <select className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none">
                                                <option>1 Ticket</option>
                                                <option>2 Tickets</option>
                                                <option>3 Tickets</option>
                                                <option>4 Tickets</option>
                                            </select>
                                        </div>

                                        {/* CTA */}

                                        <button className="w-full bg-cyan-500 hover:bg-cyan-400 transition py-4 rounded-2xl text-lg font-bold shadow-lg shadow-cyan-500/30">
                                            Book Tickets Now
                                        </button>

                                        <button className="w-full mt-4 border border-white/10 hover:border-cyan-400 transition py-4 rounded-2xl font-semibold">
                                            Add To Wishlist
                                        </button>

                                        <p className="text-center text-xs text-slate-500 mt-5">
                                            Secure payment • Instant confirmation
                                        </p>
                                    </div>
                                </div>

                                {/* Organizer Card */}

                                <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-6">
                                    <h3 className="font-bold text-xl mb-5">
                                        Organizer
                                    </h3>

                                    <div className="flex items-center gap-4">
                                        <img
                                            src="https://i.pravatar.cc/150?img=32"
                                            alt=""
                                            className="w-16 h-16 rounded-full"
                                        />

                                        <div>
                                            <h4 className="font-semibold">
                                                EventHub Entertainment
                                            </h4>

                                            <p className="text-slate-400 text-sm">
                                                Premium Event Organizer
                                            </p>
                                        </div>
                                    </div>

                                    <button className="w-full mt-5 border border-white/10 hover:border-cyan-400 py-3 rounded-xl transition">
                                        Contact Organizer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};