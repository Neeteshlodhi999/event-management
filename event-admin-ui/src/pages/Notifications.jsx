import React from "react";
import {
    FaBell,
    FaCheck,
    FaTrash,
    FaSearch,
    FaTicketAlt,
    FaCalendarAlt,
    FaUserPlus,
    FaExclamationTriangle,
    FaFilter,
} from "react-icons/fa";

const Notifications = () => {
    const notifications = [
        {
            id: 1,
            title: "New Ticket Sale",
            message:
                "15 VIP tickets sold for Summer Music Festival.",
            time: "5 min ago",
            type: "sales",
            unread: true,
            icon: <FaTicketAlt />,
        },
        {
            id: 2,
            title: "New User Registration",
            message:
                "Rahul Sharma registered on the platform.",
            time: "30 min ago",
            type: "user",
            unread: true,
            icon: <FaUserPlus />,
        },
        {
            id: 3,
            title: "Upcoming Event Reminder",
            message:
                "AI Conference 2026 starts in 24 hours.",
            time: "1 hour ago",
            type: "event",
            unread: false,
            icon: <FaCalendarAlt />,
        },
        {
            id: 4,
            title: "System Alert",
            message:
                "Payment gateway maintenance scheduled tonight.",
            time: "3 hours ago",
            type: "system",
            unread: false,
            icon: <FaExclamationTriangle />,
        },
    ];

    const getBadgeColor = (type) => {
        switch (type) {
            case "sales":
                return "bg-green-500/20 text-green-400";
            case "user":
                return "bg-cyan-500/20 text-cyan-400";
            case "event":
                return "bg-purple-500/20 text-purple-400";
            default:
                return "bg-yellow-500/20 text-yellow-400";
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="flex flex-col lg:flex-row justify-between gap-5">
                <div>
                    <h1 className="text-4xl font-black text-white">
                        Notifications
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Monitor platform activities and important alerts.
                    </p>
                </div>

                <button className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold flex items-center gap-3">
                    <FaCheck />
                    Mark All Read
                </button>
            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-4xl font-black text-cyan-400">
                        124
                    </h3>

                    <p className="text-slate-400 mt-2">
                        Total Notifications
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-4xl font-black text-yellow-400">
                        18
                    </h3>

                    <p className="text-slate-400 mt-2">
                        Unread
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-4xl font-black text-green-400">
                        42
                    </h3>

                    <p className="text-slate-400 mt-2">
                        Sales Alerts
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-4xl font-black text-purple-400">
                        24
                    </h3>

                    <p className="text-slate-400 mt-2">
                        Event Alerts
                    </p>
                </div>
            </div>

            {/* Search + Filter */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-4 text-slate-500" />

                        <input
                            type="text"
                            placeholder="Search notifications..."
                            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none"
                        />
                    </div>

                    <button className="bg-slate-900 border border-white/10 px-5 rounded-xl flex items-center gap-3">
                        <FaFilter />
                        Filter
                    </button>
                </div>
            </div>

            {/* Notification List */}

            <div className="space-y-5">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`bg-white/5 border rounded-3xl p-6 hover:border-cyan-400 transition ${notification.unread
                                ? "border-cyan-500/40"
                                : "border-white/10"
                            }`}
                    >
                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                            <div className="flex gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-cyan-400 text-xl">
                                    {notification.icon}
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 flex-wrap mb-2">
                                        <h3 className="text-xl font-bold">
                                            {notification.title}
                                        </h3>

                                        {notification.unread && (
                                            <span className="bg-cyan-500 text-xs px-3 py-1 rounded-full font-semibold">
                                                NEW
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-slate-400">
                                        {notification.message}
                                    </p>

                                    <div className="flex items-center gap-4 mt-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                                                notification.type
                                            )}`}
                                        >
                                            {notification.type}
                                        </span>

                                        <span className="text-slate-500 text-sm">
                                            {notification.time}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}

                            <div className="flex items-center gap-3">
                                <button className="bg-green-500/10 text-green-400 hover:bg-green-500/20 px-4 py-3 rounded-xl transition">
                                    Mark Read
                                </button>

                                <button className="bg-red-500/10 text-red-400 hover:bg-red-500/20 p-4 rounded-xl transition">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}

            <div className="hidden bg-white/5 border border-white/10 rounded-3xl p-16 text-center">
                <FaBell className="text-5xl text-cyan-400 mx-auto mb-4" />

                <h3 className="text-2xl font-bold mb-2">
                    No Notifications
                </h3>

                <p className="text-slate-400">
                    You're all caught up.
                </p>
            </div>
        </div>
    );
};

export default Notifications;