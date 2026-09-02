import React from "react";
import {
  FaImage,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaTag,
  FaSave,
  FaRocket,
} from "react-icons/fa";

const CreateEvent = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">
          Create New Event
        </h1>

        <p className="text-slate-400">
          Create and publish a new event for your audience.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}

        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            {/* Banner Upload */}

            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">
                Event Banner
              </label>

              <div className="border-2 border-dashed border-white/10 rounded-3xl p-10 text-center hover:border-cyan-500 transition cursor-pointer">
                <FaImage className="text-5xl text-cyan-400 mx-auto mb-4" />

                <h3 className="text-xl font-semibold mb-2">
                  Upload Event Banner
                </h3>

                <p className="text-slate-400">
                  PNG, JPG, WEBP (Max 5MB)
                </p>
              </div>
            </div>

            {/* Basic Details */}

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm mb-2">
                  Event Name
                </label>

                <input
                  type="text"
                  placeholder="Summer Music Festival"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Event Category
                </label>

                <select className="w-full bg-slate-900 border border-white/10 rounded-xl p-4">
                  <option>Music</option>
                  <option>Business</option>
                  <option>Technology</option>
                  <option>Gaming</option>
                  <option>Festival</option>
                  <option>Workshop</option>
                </select>
              </div>
            </div>

            {/* Location */}

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm mb-2">
                  Venue Name
                </label>

                <input
                  type="text"
                  placeholder="Goa Beach Arena"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Location
                </label>

                <input
                  type="text"
                  placeholder="Goa, India"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none"
                />
              </div>
            </div>

            {/* Date */}

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm mb-2">
                  Start Date
                </label>

                <input
                  type="date"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  End Date
                </label>

                <input
                  type="date"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4"
                />
              </div>
            </div>

            {/* Time */}

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm mb-2">
                  Start Time
                </label>

                <input
                  type="time"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  End Time
                </label>

                <input
                  type="time"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4"
                />
              </div>
            </div>

            {/* Description */}

            <div className="mb-6">
              <label className="block text-sm mb-2">
                Event Description
              </label>

              <textarea
                rows="8"
                placeholder="Write detailed event description..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 resize-none"
              />
            </div>

            {/* Tags */}

            <div>
              <label className="block text-sm mb-2">
                Event Tags
              </label>

              <input
                type="text"
                placeholder="music, festival, live-show"
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-4"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}

        <div className="space-y-6">
          {/* Ticket Settings */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-bold mb-5">
              Ticket Settings
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm mb-2">
                  Ticket Price
                </label>

                <input
                  type="number"
                  placeholder="1999"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Total Tickets
                </label>

                <input
                  type="number"
                  placeholder="1000"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4"
                />
              </div>
            </div>
          </div>

          {/* Organizer */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-bold mb-5">
              Organizer
            </h3>

            <input
              type="text"
              placeholder="Organizer Name"
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-4"
            />
          </div>

          {/* Event Status */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-bold mb-5">
              Event Status
            </h3>

            <select className="w-full bg-slate-900 border border-white/10 rounded-xl p-4">
              <option>Draft</option>
              <option>Published</option>
              <option>Scheduled</option>
            </select>
          </div>

          {/* Actions */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="space-y-4">
              <button className="w-full bg-slate-800 hover:bg-slate-700 py-4 rounded-xl font-semibold flex items-center justify-center gap-3">
                <FaSave />
                Save Draft
              </button>

              <button className="w-full bg-cyan-500 hover:bg-cyan-400 py-4 rounded-xl font-semibold flex items-center justify-center gap-3">
                <FaRocket />
                Publish Event
              </button>
            </div>
          </div>

          {/* Quick Stats */}

          <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-bold mb-4">
              Event Checklist
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li>✓ Event Banner</li>
              <li>✓ Event Details</li>
              <li>✓ Venue Information</li>
              <li>✓ Ticket Pricing</li>
              <li>✓ Publish Event</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;