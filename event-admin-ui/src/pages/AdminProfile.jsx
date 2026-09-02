import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaCamera, FaEnvelope, FaPhone, FaSave, FaUserShield } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const fallbackPhoto = "https://i.pravatar.cc/300?img=12";

export default function AdminProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("adminUser") || "{}"));
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("adminAccessToken");

  const storeUser = (updated) => {
    setUser(updated);
    setForm({ name: updated.name || "", email: updated.email || "", phone: updated.phone || "" });
    localStorage.setItem("adminUser", JSON.stringify({ ...updated, accessToken: token }));
    window.dispatchEvent(new Event("admin-user-updated"));
  };

  const handleSessionError = (message) => {
    if (message === "Invalid token" || message === "token not found") {
      localStorage.removeItem("adminAccessToken");
      localStorage.removeItem("adminUser");
      navigate("/admin/login");
      return true;
    }
    return false;
  };

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API_URL}/users/profile`, { headers: { Authorization: `Bearer ${token}` } });
        const result = await response.json();
        if (!response.ok || !result.status) throw new Error(result.message || "Unable to load profile.");
        storeUser(result.data);
      } catch (err) { if (!handleSessionError(err.message)) setError(err.message || "Unable to load profile."); }
    }
    if (token) load(); else setError("Please log in as admin first.");
  }, []);

  async function save(event) {
    event.preventDefault(); setMessage("Saving profile..."); setError("");
    try {
      const response = await fetch(`${API_URL}/users/profile`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok || !result.status) throw new Error(result.message || "Unable to save profile.");
      storeUser(result.data); setMessage("Admin profile updated successfully.");
    } catch (err) { if (!handleSessionError(err.message)) { setMessage(""); setError(err.message || "Unable to save profile."); } }
  }

  async function upload(event) {
    const file = event.target.files?.[0]; if (!file) return;
    setMessage("Uploading photo..."); setError("");
    try {
      const data = new FormData(); data.append("image", file);
      const response = await fetch(`${API_URL}/users/profile/photo`, { method: "PATCH", headers: { Authorization: `Bearer ${token}` }, body: data });
      const result = await response.json();
      if (!response.ok || !result.status) throw new Error(result.message || "Unable to upload photo.");
      storeUser(result.data); setMessage("Profile photo updated successfully.");
    } catch (err) { if (!handleSessionError(err.message)) { setMessage(""); setError(err.message || "Unable to upload photo."); } }
  }

  return <div className="max-w-5xl mx-auto space-y-8">
    <div><h1 className="text-4xl font-black">Admin Profile</h1><p className="text-slate-400 mt-2">View and update your administrator account details.</p></div>
    <section className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"><div className="h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600" /><div className="px-8 pb-8 flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-14"><div className="relative"><img src={user.image || fallbackPhoto} alt="Admin profile" className="w-28 h-28 rounded-3xl border-4 border-slate-950 object-cover bg-slate-800" /><label className="absolute -bottom-2 -right-2 cursor-pointer bg-cyan-500 p-3 rounded-xl"><FaCamera /><input className="hidden" type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} /></label></div><div><h2 className="text-3xl font-bold">{user.name || "Administrator"}</h2><p className="text-cyan-300 flex gap-2 items-center mt-1"><FaUserShield /> Administrator</p></div></div></section>
    <form onSubmit={save} className="bg-white/5 border border-white/10 rounded-3xl p-8"><h2 className="text-2xl font-bold mb-6">Profile Information</h2><div className="grid md:grid-cols-2 gap-5"><label className="space-y-2"><span className="text-slate-300">Full name</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none" /></label><label className="space-y-2"><span className="text-slate-300">Email address</span><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none" /></label><label className="space-y-2"><span className="text-slate-300">Phone number</span><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional" className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none" /></label><div className="space-y-2"><span className="text-slate-300">Account role</span><div className="bg-slate-900 border border-white/10 rounded-xl p-4 text-cyan-300">Administrator</div></div></div><button className="mt-7 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold flex items-center gap-3"><FaSave /> Save Changes</button>{message && <p className="text-emerald-400 mt-4">{message}</p>}{error && <p className="text-red-400 mt-4">{error}</p>}</form>
    <section className="grid md:grid-cols-2 gap-5"><div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex gap-4 items-center"><FaEnvelope className="text-cyan-400 text-xl" /><div><p className="text-slate-400 text-sm">Email</p><p>{user.email || "Not available"}</p></div></div><div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex gap-4 items-center"><FaPhone className="text-green-400 text-xl" /><div><p className="text-slate-400 text-sm">Phone</p><p>{user.phone || "Not added"}</p></div></div></section>
  </div>;
}
