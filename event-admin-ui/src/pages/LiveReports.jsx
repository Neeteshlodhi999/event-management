import { useCallback, useEffect, useMemo, useState } from "react";
import { FaDownload, FaFileAlt, FaMoneyBillWave, FaSyncAlt, FaTicketAlt, FaTrophy, FaUsers } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

function download(name, rows) {
  const csv = rows.map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a"); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url);
}

export default function LiveReports() {
  const [events, setEvents] = useState([]), [bookings, setBookings] = useState([]), [error, setError] = useState(""), [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminAccessToken");

  const loadReports = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const responses = await Promise.all([fetch(`${API}/events/my?limit=100`, { headers }), fetch(`${API}/bookings/get-all-bookings?limit=100`, { headers })]);
      const data = await Promise.all(responses.map(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.status) throw new Error(result.message || "Unable to load reports.");
        return result.data;
      }));
      setEvents(data[0]); setBookings(data[1]);
    } catch (err) { setError(err.message || "Unable to load reports."); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { loadReports(); }, [loadReports]);
  const active = bookings.filter((booking) => !booking.isCancel);
  const revenue = active.reduce((sum, booking) => sum + Number(booking.total_ticket_amount || 0), 0);
  const tickets = active.reduce((sum, booking) => sum + Number(booking.booked_tickets || 0), 0);
  const attendees = new Set(active.map((booking) => booking.attendee?._id || booking.attendee).filter(Boolean)).size;
  const performance = useMemo(() => events.map((event) => {
    const eventBookings = active.filter((booking) => String(booking.event?._id || booking.event) === String(event._id));
    return { event: event.title, date: event.date, venue: event.venue, bookings: eventBookings.length, tickets: eventBookings.reduce((sum, booking) => sum + Number(booking.booked_tickets || 0), 0), revenue: eventBookings.reduce((sum, booking) => sum + Number(booking.total_ticket_amount || 0), 0) };
  }).sort((a, b) => b.revenue - a.revenue), [events, active]);
  const stats = [["Total Events", events.length, <FaFileAlt />, "text-cyan-400"], ["Active Attendees", attendees, <FaUsers />, "text-green-400"], ["Revenue Generated", money(revenue), <FaMoneyBillWave />, "text-yellow-400"], ["Tickets Sold", tickets, <FaTicketAlt />, "text-purple-400"]];

  return <div className="space-y-8"><div className="flex flex-col sm:flex-row justify-between gap-4"><div><h1 className="text-4xl font-black">Reports & Analytics</h1><p className="text-slate-400 mt-2">Live reports from your events and bookings.</p></div><button onClick={loadReports} disabled={loading} className="bg-slate-800 hover:bg-slate-700 disabled:opacity-60 px-5 py-3 rounded-xl font-semibold flex gap-2 items-center"><FaSyncAlt className={loading ? "animate-spin" : ""} />{loading ? "Refreshing..." : "Refresh Report"}</button></div>{error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-2xl p-4">{error} <button onClick={loadReports} className="underline ml-2">Try again</button></div>}<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">{stats.map(([title, value, icon, color]) => <div key={title} className="bg-white/5 border border-white/10 rounded-3xl p-6"><div className={`${color} text-3xl mb-4`}>{icon}</div><h2 className="text-3xl font-black">{value}</h2><p className="text-slate-400 mt-2">{title}</p></div>)}</div><section className="bg-white/5 border border-white/10 rounded-3xl p-7"><div className="flex flex-col sm:flex-row justify-between gap-4 mb-5"><h2 className="text-2xl font-bold flex gap-3 items-center"><FaTrophy className="text-yellow-400" /> Event Performance</h2><button onClick={() => download("event-performance-report.csv", [["Event", "Date", "Venue", "Bookings", "Tickets sold", "Revenue"], ...performance.map((row) => [row.event, row.date, row.venue, row.bookings, row.tickets, row.revenue])])} className="bg-cyan-500 px-4 py-2 rounded-xl flex gap-2 items-center"><FaDownload /> Download report</button></div><div className="overflow-x-auto"><table className="w-full text-left"><thead className="border-b border-white/10 text-slate-400"><tr><th className="p-3">Event</th><th className="p-3">Date</th><th className="p-3">Bookings</th><th className="p-3">Tickets</th><th className="p-3">Revenue</th></tr></thead><tbody>{performance.map((row) => <tr key={row.event} className="border-b border-white/5"><td className="p-3">{row.event}</td><td className="p-3">{row.date}</td><td className="p-3">{row.bookings}</td><td className="p-3">{row.tickets}</td><td className="p-3 text-green-400">{money(row.revenue)}</td></tr>)}{!performance.length && <tr><td colSpan="5" className="p-7 text-center text-slate-400">{loading ? "Loading reports..." : "No events created yet."}</td></tr>}</tbody></table></div></section><section className="grid md:grid-cols-2 gap-5"><button onClick={() => download("attendee-report.csv", [["Attendee", "Email", "Event", "Ticket type", "Tickets", "Amount", "Booking date", "Status"], ...bookings.map((booking) => [booking.attendee?.name, booking.attendee?.email, booking.event?.title, booking.ticket_type, booking.booked_tickets, booking.total_ticket_amount, new Date(booking.createdAt).toLocaleDateString(), booking.isCancel ? "Cancelled" : "Booked"])])} className="bg-green-500/10 border border-green-500/30 rounded-3xl p-7 text-left hover:bg-green-500/20"><h3 className="font-bold text-xl">Attendee Report</h3><p className="text-slate-400 mt-2">Download names, emails, ticket types, and booking status.</p><span className="block text-green-400 mt-5">Download CSV</span></button><button onClick={() => download("revenue-report.csv", [["Event", "Ticket type", "Amount", "Date", "Status"], ...bookings.map((booking) => [booking.event?.title, booking.ticket_type, booking.total_ticket_amount, new Date(booking.createdAt).toLocaleDateString(), booking.isCancel ? "Cancelled" : "Completed"])])} className="bg-cyan-500/10 border border-cyan-500/30 rounded-3xl p-7 text-left hover:bg-cyan-500/20"><h3 className="font-bold text-xl">Revenue Report</h3><p className="text-slate-400 mt-2">Download all booking amounts and completed/cancelled status.</p><span className="block text-cyan-400 mt-5">Download CSV</span></button></section></div>;
}
