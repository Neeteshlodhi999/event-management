import React from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGlobe,
    FaLinkedin,
    FaTwitter,
    FaEdit,
    FaCalendarAlt,
    FaTicketAlt,
    FaUsers,
    FaCheckCircle,
} from "react-icons/fa";

const Profile = ({ role = "user" }) => {
    const isAdmin = role === "admin";

    return (
        <div className="space-y-8">
            {/* Cover Section */}

            <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <div className="h-56 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600" />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                    <img
                        src="https://i.pravatar.cc/300"
                        alt="Profile"
                        className="w-32 h-32 rounded-3xl border-4 border-slate-950 object-cover"
                    />

                    <div className="pb-5">
                        <h1 className="text-3xl font-black text-white">
                            Rahul Sharma
                        </h1>

                        <p className="text-slate-200">
                            {isAdmin
                                ? "Event Organizer & Administrator"
                                : "Event Participant"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-16" />

            {/* Top Actions */}

            <div className="flex justify-end">
                <button className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold flex items-center gap-3">
                    <FaEdit />
                    Edit Profile
                </button>
            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaCalendarAlt className="text-cyan-400 text-3xl mb-4" />
                    <h3 className="text-3xl font-black">
                        {isAdmin ? "48" : "12"}
                    </h3>
                    <p className="text-slate-400">
                        {isAdmin ? "Events Created" : "Events Joined"}
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaTicketAlt className="text-green-400 text-3xl mb-4" />
                    <h3 className="text-3xl font-black">
                        {isAdmin ? "8.4K" : "24"}
                    </h3>
                    <p className="text-slate-400">
                        {isAdmin ? "Tickets Sold" : "Tickets Booked"}
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaUsers className="text-purple-400 text-3xl mb-4" />
                    <h3 className="text-3xl font-black">
                        {isAdmin ? "2.5K" : "125"}
                    </h3>
                    <p className="text-slate-400">
                        {isAdmin ? "Attendees" : "Connections"}
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaCheckCircle className="text-yellow-400 text-3xl mb-4" />
                    <h3 className="text-3xl font-black">
                        {isAdmin ? "96%" : "100%"}
                    </h3>
                    <p className="text-slate-400">
                        {isAdmin ? "Success Rate" : "Attendance"}
                    </p>
                </div>
            </div>

            {/* Profile Details */}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left */}

                <div className="space-y-6">
                    {/* About */}

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h2 className="text-xl font-bold mb-4">
                            About
                        </h2>

                        <p className="text-slate-400 leading-relaxed">
                            Passionate about creating memorable experiences through
                            professional event management and networking opportunities.
                        </p>
                    </div>

                    {/* Contact */}

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h2 className="text-xl font-bold mb-5">
                            Contact Information
                        </h2>

                        <div className="space-y-4">
                            <div className="flex gap-3 items-center">
                                <FaEnvelope className="text-cyan-400" />
                                <span>rahul@example.com</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <FaPhone className="text-green-400" />
                                <span>+91 9876543210</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <FaMapMarkerAlt className="text-red-400" />
                                <span>Indore, India</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <FaGlobe className="text-purple-400" />
                                <span>www.eventhub.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h2 className="text-xl font-bold mb-5">
                            Social Profiles
                        </h2>

                        <div className="space-y-3">
                            <button className="w-full bg-slate-900 rounded-xl p-4 flex items-center gap-3">
                                <FaLinkedin />
                                LinkedIn
                            </button>

                            <button className="w-full bg-slate-900 rounded-xl p-4 flex items-center gap-3">
                                <FaTwitter />
                                Twitter / X
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right */}

                <div className="lg:col-span-2">
                    {/* Personal Info */}

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-6">
                            Personal Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">
                            <input
                                type="text"
                                defaultValue="Rahul Sharma"
                                className="bg-slate-900 border border-white/10 rounded-xl p-4"
                            />

                            <input
                                type="email"
                                defaultValue="rahul@example.com"
                                className="bg-slate-900 border border-white/10 rounded-xl p-4"
                            />

                            <input
                                type="text"
                                defaultValue="+91 9876543210"
                                className="bg-slate-900 border border-white/10 rounded-xl p-4"
                            />

                            <input
                                type="text"
                                defaultValue="Indore"
                                className="bg-slate-900 border border-white/10 rounded-xl p-4"
                            />
                        </div>

                        <textarea
                            rows={5}
                            className="w-full mt-5 bg-slate-900 border border-white/10 rounded-xl p-4"
                            defaultValue="Experienced event organizer passionate about delivering exceptional experiences."
                        />

                        <button className="mt-6 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold">
                            Save Changes
                        </button>
                    </div>

                    {/* Activity Timeline */}

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-6">
                            Recent Activity
                        </h2>

                        <div className="space-y-5">
                            {[
                                "Created Summer Music Festival Event",
                                "Updated Profile Information",
                                "Booked 2 VIP Tickets",
                                "Downloaded Event Ticket",
                                "Completed Event Check-In",
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="w-3 h-3 rounded-full bg-cyan-400 mt-2" />

                                    <div>
                                        <p>{activity}</p>
                                        <span className="text-sm text-slate-500">
                                            2 hours ago
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;