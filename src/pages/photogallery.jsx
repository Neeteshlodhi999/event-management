import React from "react";
import {
    FaImages,
    FaCamera,
    FaDownload,
    FaHeart,
    FaShareAlt,
    FaCalendarAlt,
    FaUpload,
} from "react-icons/fa";

const galleryImages = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        title: "Summer Music Festival",
        category: "Music",
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865",
        title: "Startup Summit",
        category: "Business",
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        title: "Gaming Championship",
        category: "Gaming",
    },
    {
        id: 4,
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        title: "Marketing Workshop",
        category: "Workshop",
    },
    {
        id: 5,
        image:
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
        title: "Live Concert",
        category: "Music",
    },
    {
        id: 6,
        image:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754",
        title: "AI Conference",
        category: "Technology",
    },
    {
        id: 7,
        image:
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
        title: "Night Festival",
        category: "Festival",
    },
    {
        id: 8,
        image:
            "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
        title: "Award Ceremony",
        category: "Corporate",
    },
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero */}

            <section className="relative overflow-hidden py-24">
                <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[120px]" />

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 px-5 py-2 rounded-full mb-6">
                        <FaImages className="text-cyan-400" />
                        Event Memories
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Photo
                        <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            {" "}Gallery
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        Explore unforgettable moments captured from concerts,
                        conferences, festivals, workshops, and premium events.
                    </p>
                </div>
            </section>

            {/* Stats */}

            <section className="max-w-7xl mx-auto px-6 mb-16">
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        ["15K+", "Photos"],
                        ["250+", "Events"],
                        ["120+", "Photographers"],
                        ["500K+", "Downloads"],
                    ].map(([value, label]) => (
                        <div
                            key={label}
                            className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center"
                        >
                            <h3 className="text-4xl font-black text-cyan-400 mb-2">
                                {value}
                            </h3>
                            <p className="text-slate-400">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories */}

            <section className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex flex-wrap gap-4 justify-center">
                    {[
                        "All",
                        "Music",
                        "Technology",
                        "Business",
                        "Gaming",
                        "Festival",
                        "Workshop",
                    ].map((category) => (
                        <button
                            key={category}
                            className={`px-6 py-3 rounded-2xl font-semibold transition ${category === "All"
                                    ? "bg-cyan-500"
                                    : "bg-white/5 border border-white/10 hover:border-cyan-500"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Featured Album */}

            <section className="max-w-7xl mx-auto px-6 mb-20">
                <div className="relative rounded-[40px] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                        alt=""
                        className="w-full h-125 object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to- from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute bottom-10 left-10">
                        <span className="bg-cyan-500 px-4 py-2 rounded-full text-sm font-semibold">
                            Featured Album
                        </span>

                        <h2 className="text-5xl font-black mt-5 mb-3">
                            Summer Music Festival 2026
                        </h2>

                        <p className="text-slate-300 max-w-xl">
                            1,250+ photos from one of the biggest music festivals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}

            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="columns-1 md:columns-2 xl:columns-4 gap-6 space-y-6">

                    {galleryImages.map((image) => (
                        <div
                            key={image.id}
                            className="break-inside-avoid group bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
                        >
                            <div className="relative overflow-hidden">

                                <img
                                    src={`${image.image}?q=80&w=1000&auto=format&fit=crop`}
                                    alt={image.title}
                                    className="w-full object-cover group-hover:scale-110 transition duration-700"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <h3 className="font-bold">
                                                {image.title}
                                            </h3>

                                            <p className="text-sm text-slate-300">
                                                {image.category}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">

                                            <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                                                <FaHeart />
                                            </button>

                                            <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                                                <FaShareAlt />
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </section>

            {/* Upload Memories */}

            <section className="max-w-5xl mx-auto px-6 pb-24">

                <div className="bg-white/5 border border-white/10 rounded-[40px] p-12 text-center">

                    <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/20 flex items-center justify-center mb-6">
                        <FaUpload className="text-3xl text-cyan-400" />
                    </div>

                    <h2 className="text-4xl font-black mb-4">
                        Share Your Event Memories
                    </h2>

                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        Upload your favorite event photos and become part of the EventHub community gallery.
                    </p>

                    <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-2xl font-bold">
                        Upload Photos
                    </button>

                </div>

            </section>

            {/* Footer Info */}

            <section className="border-t border-white/10 py-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">

                    <div>
                        <h3 className="font-bold text-xl mb-2">
                            Gallery Information
                        </h3>

                        <p className="text-slate-400">
                            All images are copyrighted by their respective photographers.
                        </p>
                    </div>

                    <div className="flex gap-6 text-slate-400">
                        <button className="flex items-center gap-2">
                            <FaCamera />
                            Photographers
                        </button>

                        <button className="flex items-center gap-2">
                            <FaDownload />
                            Downloads
                        </button>

                        <button className="flex items-center gap-2">
                            <FaCalendarAlt />
                            Albums
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
};