import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <i className="fa-solid fa-calendar-days text-white"></i>
                        </div>

                        <h1 className="text-2xl font-bold tracking-wide text-white">
                            Event<span className="text-cyan-400">Hub</span>
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-gray-300">
                        <NavLink to="/" className={({ isActive }) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition"}>
                            Home
                        </NavLink>
                        <NavLink to="/events" className={({ isActive }) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition"} end>
                            Events
                        </NavLink>
                        <NavLink to="/photo-gallery" className={({ isActive }) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition"}>
                            Photo Gallery
                        </NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition"}>
                            Contact
                        </NavLink>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/auth"
                            className="bg-cyan-500 hover:bg-cyan-400 transition px-7 py-1 rounded-xl font-semibold shadow-lg shadow-cyan-500/30"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
