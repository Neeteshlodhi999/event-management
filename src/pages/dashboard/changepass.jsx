import React from 'react'

export default function ChangePassword() {
    return (
        <>
            {/* Password */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <h3 className="text-2xl font-bold mb-8">
                    Change Password
                </h3>

                <div className="space-y-5">

                    <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                    />

                    <button className="bg-purple-500 hover:bg-purple-400 transition px-8 py-4 rounded-xl font-bold">
                        Update Password
                    </button>

                </div>

            </div>
        </>
    )
}