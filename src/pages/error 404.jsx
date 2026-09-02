import React from 'react'
import { FaMapLocationDot, FaMagnifyingGlass, FaCalendarCheck, FaHouse } from "react-icons/fa6";

export default function NotFoundPage() {
    return (
        <>
            <div className='text-white min-h-screen flex items-center justify-center px-6 relative pt-28 pb-20'>
                <div className="relative z-10 max-w-4xl text-center">
                    {/* Icon */}
                    <div className="relative w-40 h-40 mx-auto mb-10 floating">
                        <div className="absolute inset-0 rounded-full border border-cyan-500/30 pulse-ring" />
                        <div className="w-40 h-40 rounded-full glass flex items-center justify-center">
                            <FaMapLocationDot className="text-6xl text-cyan-400" />
                        </div>
                    </div>
                    {/* 404 */}
                    <h1 className="text-5xl md:text-7xl font-black mb-4">
                        <span className="gradient-text">404</span>
                    </h1>
                    <h2 className="text-xl md:text-3xl font-black mb-6">
                        Oops! Event Not Found
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        The page you're looking for may have been removed, renamed, or is
                        temporarily unavailable.
                    </p>
                    {/* Search Box */}
                    <div className="max-w-2xl mx-auto glass rounded-3xl p-3 mb-10">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1 flex items-center px-5 h-14">
                                <FaMagnifyingGlass className="text-cyan-400" />
                                <input
                                    type="text"
                                    placeholder="Search events, categories, locations..."
                                    className="bg-transparent outline-none px-4 w-full text-white placeholder-gray-500"
                                />
                            </div>
                            <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 h-14 rounded-2xl font-bold shadow-lg shadow-cyan-500/20">
                                Search
                            </button>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="#"
                            className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-cyan-500/20"
                        >
                            <FaHouse className="mr-2 inline" />
                            Back To Home
                        </a>
                        <a
                            href="#"
                            className="glass hover:border-cyan-400 transition px-8 py-4 rounded-2xl font-semibold"
                        >
                            <FaCalendarCheck className="mr-2 inline" />
                            Browse Events
                        </a>
                    </div>
                    {/* Popular Links */}
                    <div className="mt-14">
                        <p className="text-gray-500 mb-5">Popular Pages</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="#"
                                className="glass px-5 py-3 rounded-xl hover:border-cyan-400 transition"
                            >
                                Upcoming Events
                            </a>
                            <a
                                href="#"
                                className="glass px-5 py-3 rounded-xl hover:border-purple-400 transition"
                            >
                                Conferences
                            </a>
                            <a
                                href="#"
                                className="glass px-5 py-3 rounded-xl hover:border-pink-400 transition"
                            >
                                Music Festivals
                            </a>
                            <a
                                href="#"
                                className="glass px-5 py-3 rounded-xl hover:border-green-400 transition"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}