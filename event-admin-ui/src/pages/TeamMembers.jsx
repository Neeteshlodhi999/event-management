import React from "react";
import {
    FaUsers,
    FaUserPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaShieldAlt,
    FaUserTie,
    FaUserCog,
    FaCircle,
} from "react-icons/fa";

const TeamMembers = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul@eventhub.com",
            role: "Admin",
            status: "Online",
            permissions: [
                "Manage Events",
                "Revenue",
                "Users",
            ],
            avatar:
                "https://i.pravatar.cc/150?img=11",
        },
        {
            id: 2,
            name: "Priya Patel",
            email: "priya@eventhub.com",
            role: "Manager",
            status: "Online",
            permissions: [
                "Manage Events",
                "Reports",
            ],
            avatar:
                "https://i.pravatar.cc/150?img=22",
        },
        {
            id: 3,
            name: "Aman Verma",
            email: "aman@eventhub.com",
            role: "Staff",
            status: "Offline",
            permissions: [
                "Check-ins",
                "Attendees",
            ],
            avatar:
                "https://i.pravatar.cc/150?img=33",
        },
    ];

    const getRoleBadge = (role) => {
        switch (role) {
            case "Admin":
                return "bg-red-500/20 text-red-400";
            case "Manager":
                return "bg-cyan-500/20 text-cyan-400";
            default:
                return "bg-green-500/20 text-green-400";
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="flex flex-col lg:flex-row justify-between gap-5">
                <div>
                    <h1 className="text-4xl font-black text-white">
                        Team Members
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage organizers, managers and staff permissions.
                    </p>
                </div>

                <button className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold flex items-center gap-3">
                    <FaUserPlus />
                    Invite Member
                </button>
            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaUsers className="text-cyan-400 text-3xl mb-4" />
                    <h3 className="text-4xl font-black">12</h3>
                    <p className="text-slate-400 mt-2">
                        Total Members
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaShieldAlt className="text-red-400 text-3xl mb-4" />
                    <h3 className="text-4xl font-black">2</h3>
                    <p className="text-slate-400 mt-2">
                        Admins
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaUserTie className="text-cyan-400 text-3xl mb-4" />
                    <h3 className="text-4xl font-black">4</h3>
                    <p className="text-slate-400 mt-2">
                        Managers
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaUserCog className="text-green-400 text-3xl mb-4" />
                    <h3 className="text-4xl font-black">6</h3>
                    <p className="text-slate-400 mt-2">
                        Staff Members
                    </p>
                </div>
            </div>

            {/* Search & Filter */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-4 text-slate-500" />

                        <input
                            type="text"
                            placeholder="Search team member..."
                            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none"
                        />
                    </div>

                    <select className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3">
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>Manager</option>
                        <option>Staff</option>
                    </select>
                </div>
            </div>

            {/* Team Grid */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-400 transition"
                    >
                        <div className="flex items-center gap-4 mb-5">
                            <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-16 h-16 rounded-full"
                            />

                            <div>
                                <h3 className="font-bold text-lg">
                                    {member.name}
                                </h3>

                                <p className="text-slate-400 text-sm">
                                    {member.email}
                                </p>
                            </div>
                        </div>

                        {/* Status */}

                        <div className="flex items-center gap-2 mb-4">
                            <FaCircle
                                className={`text-xs ${member.status === "Online"
                                        ? "text-green-400"
                                        : "text-slate-500"
                                    }`}
                            />

                            <span className="text-sm">
                                {member.status}
                            </span>
                        </div>

                        {/* Role */}

                        <div className="mb-5">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(
                                    member.role
                                )}`}
                            >
                                {member.role}
                            </span>
                        </div>

                        {/* Permissions */}

                        <div className="mb-6">
                            <h4 className="font-semibold mb-3">
                                Permissions
                            </h4>

                            <div className="flex flex-wrap gap-2">
                                {member.permissions.map(
                                    (permission, index) => (
                                        <span
                                            key={index}
                                            className="bg-slate-900 text-slate-300 px-3 py-1 rounded-lg text-xs"
                                        >
                                            {permission}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Actions */}

                        <div className="flex gap-3">
                            <button className="flex-1 bg-cyan-500/20 text-cyan-400 py-3 rounded-xl flex items-center justify-center gap-2">
                                <FaEdit />
                                Edit
                            </button>

                            <button className="flex-1 bg-red-500/20 text-red-400 py-3 rounded-xl flex items-center justify-center gap-2">
                                <FaTrash />
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Team Activity
                </h2>

                <div className="space-y-4">
                    {[
                        "Rahul created a new event",
                        "Priya generated a revenue report",
                        "Aman checked in 25 attendees",
                        "New staff member invited",
                    ].map((activity, index) => (
                        <div
                            key={index}
                            className="bg-slate-900 rounded-xl p-4 border border-white/10"
                        >
                            {activity}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamMembers;