import React from "react";
import {
  FaUser,
  FaBuilding,
  FaLock,
  FaBell,
  FaCreditCard,
  FaShieldAlt,
  FaKey,
  FaMoon,
  FaSave,
  FaTrash,
} from "react-icons/fa";

const Settings = () => {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-black text-white">
          Settings
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your organizer account and platform preferences.
        </p>
      </div>

      {/* Profile Settings */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaUser className="text-cyan-400 text-xl" />
          <h2 className="text-2xl font-bold">
            Profile Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Designation"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />
        </div>

        <button className="mt-6 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl flex items-center gap-3 font-semibold">
          <FaSave />
          Save Profile
        </button>
      </div>

      {/* Company Information */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaBuilding className="text-purple-400 text-xl" />
          <h2 className="text-2xl font-bold">
            Company Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Company Name"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="GST Number"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Website URL"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Business Address"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />
        </div>
      </div>

      {/* Change Password */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaLock className="text-yellow-400 text-xl" />
          <h2 className="text-2xl font-bold">
            Change Password
          </h2>
        </div>

        <div className="grid gap-5">
          <input
            type="password"
            placeholder="Current Password"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="password"
            placeholder="New Password"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />
        </div>

        <button className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold">
          Update Password
        </button>
      </div>

      {/* Notification Settings */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaBell className="text-green-400 text-xl" />
          <h2 className="text-2xl font-bold">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-5">
          {[
            "Email Notifications",
            "Ticket Sale Alerts",
            "New User Registrations",
            "Event Reminder Alerts",
          ].map((item, index) => (
            <label
              key={index}
              className="flex justify-between items-center bg-slate-900 rounded-xl p-4"
            >
              <span>{item}</span>

              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Payment Settings */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaCreditCard className="text-cyan-400 text-xl" />
          <h2 className="text-2xl font-bold">
            Payment Details
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Bank Name"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Account Holder"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Account Number"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="IFSC Code"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />
        </div>
      </div>

      {/* Security */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaShieldAlt className="text-red-400 text-xl" />
          <h2 className="text-2xl font-bold">
            Security Settings
          </h2>
        </div>

        <div className="space-y-4">
          <label className="flex justify-between items-center bg-slate-900 rounded-xl p-4">
            <span>Enable Two Factor Authentication</span>

            <input
              type="checkbox"
              className="w-5 h-5"
            />
          </label>

          <label className="flex justify-between items-center bg-slate-900 rounded-xl p-4">
            <span>Login Activity Alerts</span>

            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5"
            />
          </label>
        </div>
      </div>

      {/* API Keys */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaKey className="text-orange-400 text-xl" />
          <h2 className="text-2xl font-bold">
            API Keys
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 flex justify-between items-center">
          <span className="text-slate-400">
            sk_live_xxxxxxxxxxxxxxxxx
          </span>

          <button className="bg-cyan-500 px-4 py-2 rounded-lg">
            Regenerate
          </button>
        </div>
      </div>

      {/* Theme */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaMoon className="text-indigo-400 text-xl" />
          <h2 className="text-2xl font-bold">
            Appearance
          </h2>
        </div>

        <select className="bg-slate-900 border border-white/10 rounded-xl p-4 w-full md:w-72">
          <option>Dark Theme</option>
          <option>Light Theme</option>
          <option>System Default</option>
        </select>
      </div>

      {/* Danger Zone */}

      <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaTrash className="text-red-400 text-xl" />
          <h2 className="text-2xl font-bold text-red-400">
            Danger Zone
          </h2>
        </div>

        <p className="text-slate-400 mb-6">
          Permanently delete your organizer account and all associated data.
        </p>

        <button className="bg-red-500 hover:bg-red-400 px-6 py-3 rounded-xl font-semibold">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;