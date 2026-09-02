import React, { useEffect, useState } from "react";
import {
    FaTicketAlt,
    FaHeart,
    FaBell,
    FaUser,
    FaLock,
    FaCog,
    FaChartLine,
    FaSignOutAlt,
    FaTimes,
    FaBars,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "{}"));
    const navigate = useNavigate();

    useEffect(() => {
        const refreshUser = () => setUser(JSON.parse(localStorage.getItem("user") || "{}"));
        window.addEventListener("user-updated", refreshUser);
        window.addEventListener("storage", refreshUser);
        return () => {
            window.removeEventListener("user-updated", refreshUser);
            window.removeEventListener("storage", refreshUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/auth");
    };

    const menuItems = [
        { name: "Dashboard", icon: <FaChartLine />, link: "/dashboard" },
        { name: "My Tickets", icon: <FaTicketAlt />, link: "/dashboard/my-tickets" },
        { name: "Saved Events", icon: <FaHeart />, link: "/dashboard/saved-events" },
        { name: "Notifications", icon: <FaBell />, link: "/dashboard/notifications" },
        { name: "Profile", icon: <FaUser />, link: "/dashboard/profile" },
        { name: "Change Password", icon: <FaLock />, link: "/dashboard/change-password" },
        { name: "Settings", icon: <FaCog />, link: "/dashboard/settings" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white flex overflow-hidden">

            {/* ================= SIDEBAR ================= */}

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                />
            )}

            <aside className={`fixed lg:static top-0 left-0 h-screen w-72 bg-slate-900 border-r border-white/10 z-50 transform transition-all duration-300 ease-in-out
                              ${sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"}`}
            >

                {/* Logo */}

                <div className="p-6 border-b border-white/10 flex items-center justify-between">

                    <h1 className="text-3xl font-black py-1">
                        Event<span className="text-cyan-400">Hub</span>
                    </h1>

                    {/* Close Button Mobile */}

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
                    >
                        <FaTimes />
                    </button>

                </div>

                <nav className="flex-1 p-5 space-y-2">

                    {menuItems.map(({ name, icon, link }, index) => (
                        <NavLink
                            to={link}
                            key={index}
                            className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${isActive
                                ? "bg-cyan-500 text-white"
                                : "hover:bg-white/5 text-slate-300"
                                }`}
                        >
                            {icon}
                            {name}
                        </NavLink>
                    ))}

                </nav>

                <div className="p-5 border-t border-white/10">

                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-500/10 text-red-400 transition">
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>

            </aside>

            {/* ================= MAIN ================= */}

            <main className="flex-1 lg:ml-0 overflow-auto">

                {/* Header */}

                <header className="border-b border-white/10 backdrop-blur-xl bg-slate-950/80 sticky top-0 z-20">

                    <div className="px-8 py-3.5 flex justify-between items-center">

                        <div className="flex items-center gap-4">

                            {/* Mobile Menu */}

                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                            >
                                <FaBars />
                            </button>

                            <div>

                                <h2 className="text-3xl font-black">
                                    Welcome Back 👋
                                </h2>

                                <p className="text-slate-400 mt-1">
                                    Manage your events and tickets
                                </p>

                            </div>
                        </div>

                        <div className="flex items-center gap-4">

                            <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <FaBell />
                            </button>

                            <img
                                src={user.image || "https://i.pravatar.cc/150?img=32"}
                                alt=""
                                className="w-12 h-12 rounded-full"
                            />

                        </div>

                    </div>

                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
