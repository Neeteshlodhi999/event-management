import {
    FaChartPie,
    FaCalendarAlt,
    FaPlusCircle,
    FaUsers,
    FaMoneyBillWave,
    FaFileAlt,
    FaCog,
    FaBell,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router";

const menus = [
    {
        title: "Dashboard",
        icon: <FaChartPie />,
        path: "/",
    },
    {
        title: "Events",
        icon: <FaCalendarAlt />,
        path: "/events",
    },
    {
        title: "Create Event",
        icon: <FaPlusCircle />,
        path: "/create-event",
    },
    {
        title: "Attendees",
        icon: <FaUsers />,
        path: "/attendees",
    },
    {
        title: "Revenue",
        icon: <FaMoneyBillWave />,
        path: "/revenue",
    },
    {
        title: "Reports",
        icon: <FaFileAlt />,
        path: "/reports",
    },
    {
        title: "Notifications",
        icon: <FaBell />,
        path: "/notifications",
    },
    {
        title: "Profile",
        icon: <FaUser />,
        path: "/profile"
    },
    {
        title: "Settings",
        icon: <FaCog />,
        path: "/settings",
    },
];

export default function Sidebar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
    };
    return (
        <aside className="w-72 bg-slate-900 border-r border-white/10">
            <div className="p-6 border-b border-white/10">

                <h1 className="text-3xl font-black">
                    Event<span className="text-cyan-400">Hub</span>
                </h1>

                <p className="text-slate-400 mt-2">
                    Organizer Panel
                </p>

            </div>

            <nav className="p-5 space-y-2">

                {menus.map((menu) => (
                    <NavLink
                        key={menu.title}
                        to={menu.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition ${isActive
                                ? "bg-cyan-500"
                                : "hover:bg-white/5"
                            }`
                        }
                    >
                        {menu.icon}
                        {menu.title}
                    </NavLink>
                ))}

                <button onClick={logout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-300 hover:bg-red-500/10 transition">
                    <FaSignOutAlt />
                    Logout
                </button>

            </nav>
        </aside>
    );
}
