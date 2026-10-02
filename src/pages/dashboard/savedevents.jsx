import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function requestSavedEvents(token) {
  const response = await fetch(`${API}/saved-events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();

  if (!response.ok || !result?.status) {
    throw new Error(result?.message || "Unable to load saved events.");
  }

  return Array.isArray(result.data) ? result.data : [];
}

export default function SavedEvents() {
  const [saved, setSaved] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  async function load() {
    setError("");
    setLoading(true);

    try {
      setSaved(await requestSavedEvents(token));
    } catch (requestError) {
      setSaved([]);
      setError(requestError.message || "Unable to load saved events.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;

    requestSavedEvents(token)
      .then((events) => {
        if (active) setSaved(events);
      })
      .catch((requestError) => {
        if (active) {
          setSaved([]);
          setError(requestError.message || "Unable to load saved events.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  async function remove(eventId) {
    setError("");

    try {
      const response = await fetch(`${API}/saved-events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (!response.ok || !result?.status) {
        throw new Error(result?.message || "Unable to remove this saved event.");
      }

      await load();
    } catch (requestError) {
      setError(requestError.message || "Unable to remove this saved event.");
    }
  }

  const displayableEvents = saved.filter((item) => item?.event && typeof item.event === "object" && item.event._id);

  return (
    <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold">Saved Events</h3>
          <p className="text-slate-400 mt-1">Events you saved to revisit later.</p>
        </div>
        <FaHeart className="text-pink-400 text-2xl" />
      </div>

      {error && <p role="alert" className="text-red-400 mb-5">{error}</p>}
      {loading && <p className="text-slate-400">Loading saved events...</p>}

      {!loading && !error && (
        <div className="grid gap-5 md:grid-cols-2">
          {displayableEvents.map((item) => {
            const event = item.event;

            return (
              <article key={item._id} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
                {event.thumbnail
                  ? <img src={event.thumbnail} alt={`${event.title} banner`} className="w-full h-36 object-cover" />
                  : <div className="w-full h-36 bg-slate-800 flex items-center justify-center text-slate-400">No event banner</div>}
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-4">{event.title || "Saved event"}</h4>
                  <div className="space-y-3 text-slate-400">
                    <p className="flex items-center gap-3"><FaCalendarAlt />{event.date || "Date unavailable"} · {event.time || "Time unavailable"}</p>
                    <p className="flex items-center gap-3"><FaMapMarkerAlt />{event.venue || "Venue unavailable"}</p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Link to={`/events/details?id=${event._id}`} className="text-cyan-400 font-semibold">View &amp; Book</Link>
                    <button type="button" onClick={() => remove(event._id)} className="text-pink-400 font-semibold">Remove</button>
                  </div>
                </div>
              </article>
            );
          })}

          {!displayableEvents.length && <p className="text-slate-400">You have not saved any available events yet.</p>}
        </div>
      )}
    </section>
  );
}
