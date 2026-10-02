import { Link } from 'react-router-dom';

const eventCategories = [
    ['Music Events', 'Music'],
    ['Business Events', 'Business'],
    ['Tech Conferences', 'Technology'],
    ['Gaming Events', 'Gaming'],
    ['Festivals', 'Festival'],
    ['Workshops', 'Workshop'],
];

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-7">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-2xl bg-cyan-500 flex items-center justify-center">
                                <i className="fa-solid fa-calendar-days text-white" />
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

                    <div>
                        <h3 className="text-lg font-bold text-white mb-5">Quick Links</h3>
                        <div className="space-y-3 text-gray-400 text-sm">
                            <Link to="/" className="block hover:text-cyan-400 transition">Home</Link>
                            <Link to="/events" className="block hover:text-cyan-400 transition">Events</Link>
                            <Link to="/#categories" className="block hover:text-cyan-400 transition">Categories</Link>
                            <Link to="/contact" className="block hover:text-cyan-400 transition">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white mb-5">Categories</h3>
                        <div className="space-y-3 text-gray-400 text-sm">
                            {eventCategories.map(([label, category]) => (
                                <Link
                                    key={category}
                                    to={`/events?category=${encodeURIComponent(category)}`}
                                    className="block hover:text-cyan-400 transition"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white mb-5">Follow Us</h3>
                        <p className="text-gray-400 text-sm">
                            Official social profiles will be added here.
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-500 text-sm">
                    © 2026 EventHub. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
