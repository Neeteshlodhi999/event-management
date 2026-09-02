import React from 'react'

export default function Footer() {
    return (
        <>
            {/* FOOTER  */}
            <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">

                <div className="max-w-7xl mx-auto px-6 py-7">

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* Brand */}
                        <div>

                            <div className="flex items-center gap-3 mb-5">

                                <div className="w-11 h-11 rounded-2xl bg-cyan-500 flex items-center justify-center">
                                    <i className="fa-solid fa-calendar-days text-white"></i>
                                </div>

                                <h2 className="text-2xl font-black text-white">
                                    Event<span className="text-cyan-400">Hub</span>
                                </h2>

                            </div>

                            <p className="text-gray-400 leading-relaxed text-sm">
                                Modern event management platform for discovering concerts,
                                conferences, workshops, festivals, and networking events.
                            </p>

                        </div>

                        {/* Quick Links */}
                        <div>

                            <h3 className="text-lg font-bold text-white mb-5">
                                Quick Links
                            </h3>

                            <div className="space-y-3 text-gray-400 text-sm">

                                <a href="#" className="block hover:text-cyan-400 transition">
                                    Home
                                </a>

                                <a href="#" className="block hover:text-cyan-400 transition">
                                    Events
                                </a>

                                <a href="#" className="block hover:text-cyan-400 transition">
                                    Categories
                                </a>

                                <a href="#" className="block hover:text-cyan-400 transition">
                                    Contact
                                </a>

                            </div>

                        </div>

                        {/* Categories */}
                        <div>

                            <h3 className="text-lg font-bold text-white mb-5">
                                Categories
                            </h3>

                            <div className="space-y-3 text-gray-400 text-sm">

                                <a href="#" className="block hover:text-cyan-400 transition">
                                    Music Events
                                </a>

                                <a href="#" className="block hover:text-cyan-400 transition">
                                    Tech Conferences
                                </a>

                                <a href="#" className="block hover:text-cyan-400 transition">
                                    Startup Meetups
                                </a>

                                <a href="#" className="block hover:text-cyan-400 transition">
                                    Entertainment
                                </a>

                            </div>

                        </div>

                        {/* Social */}
                        <div>

                            <h3 className="text-lg font-bold text-white mb-5">
                                Follow Us
                            </h3>

                            <div className="flex items-center gap-4">

                                <a href="#"
                                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-cyan-500 transition">

                                    <i className="fa-brands fa-facebook-f"></i>

                                </a>

                                <a href="#"
                                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-pink-500 transition">

                                    <i className="fa-brands fa-instagram"></i>

                                </a>

                                <a href="#"
                                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-sky-500 transition">

                                    <i className="fa-brands fa-twitter"></i>

                                </a>

                                <a href="#"
                                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-purple-500 transition">

                                    <i className="fa-brands fa-linkedin-in"></i>

                                </a>

                            </div>

                        </div>

                    </div>

                    {/* Bottom  */}
                    <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-500 text-sm">

                        © 2026 EventHub. All Rights Reserved.

                    </div>

                </div>

            </footer>
        </>
    )
}
