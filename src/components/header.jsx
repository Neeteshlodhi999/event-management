import { useEffect, useState } from 'react';
import { FaChevronDown, FaSignOutAlt, FaTicketAlt, FaUser } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

    useEffect(() => {
        const refreshUser = () => setUser(JSON.parse(localStorage.getItem('user') || '{}'));
        window.addEventListener('user-updated', refreshUser);
        window.addEventListener('storage', refreshUser);
        return () => {
            window.removeEventListener('user-updated', refreshUser);
            window.removeEventListener('storage', refreshUser);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser({});
        setMenuOpen(false);
        navigate('/auth');
    };

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
                        {isLoggedIn ? <div className="relative">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-white/10 px-3 py-2 rounded-xl transition">
                                {user.image ? <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" /> : <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center"><FaUser /></span>}
                                <span className="hidden sm:inline max-w-28 truncate font-semibold">{user.name || 'My Account'}</span>
                                <FaChevronDown className={`text-xs transition ${menuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {menuOpen && <div className="absolute right-0 top-12 w-52 bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl">
                                <Link onClick={() => setMenuOpen(false)} to="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5"><FaUser className="text-cyan-400" /> Profile</Link>
                                <Link onClick={() => setMenuOpen(false)} to="/dashboard/my-tickets" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5"><FaTicketAlt className="text-cyan-400" /> My Tickets</Link>
                                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10"><FaSignOutAlt /> Logout</button>
                            </div>}
                        </div> : <Link to="/auth" className="bg-cyan-500 hover:bg-cyan-400 transition px-7 py-2 rounded-xl font-semibold shadow-lg shadow-cyan-500/30">Login</Link>}
                    </div>
                </div>
            </header>
        </>
    );
}
