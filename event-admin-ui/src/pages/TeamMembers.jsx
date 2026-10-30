import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { FaSearch, FaUserCheck, FaUserSlash, FaUsers } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function TeamMembers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState("");
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("adminAccessToken");
    const expired = (response) => { if (response.status !== 401) return false; localStorage.removeItem("adminAccessToken"); localStorage.removeItem("adminUser"); navigate("/admin/login"); return true; };

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await fetch(`${API}/users?limit=100`, { headers: { Authorization: `Bearer ${token}` } });
                const result = await response.json();
                if (!response.ok || !result.status) { if (expired(response)) return; throw new Error(result.message || "Unable to load accounts."); }
                setUsers(Array.isArray(result.data) ? result.data : []);
            } catch (requestError) { setError(requestError.message || "Unable to load accounts."); }
            finally { setLoading(false); }
        }
        loadUsers();
    }, [navigate, token]);

    const updateStatus = async (user) => {
        const isSuspended = !user.isSuspended;
        const action = isSuspended ? "Suspend" : "Reactivate";
        if (!window.confirm(`${action} ${user.name}'s account?`)) return;
        setSavingId(user._id); setError(""); setMessage("");
        try {
            const response = await fetch(`${API}/users/${user._id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ isSuspended }) });
            const result = await response.json();
            if (!response.ok || !result.status) { if (expired(response)) return; throw new Error(result.message || "Unable to update account."); }
            setUsers((current) => current.map((item) => item._id === user._id ? result.data : item));
            setMessage(result.message);
        } catch (requestError) { setError(requestError.message || "Unable to update account."); }
        finally { setSavingId(""); }
    };

    const admins = useMemo(() => users.filter((user) => user.role === "admin").length, [users]);
    const suspended = useMemo(() => users.filter((user) => user.isSuspended).length, [users]);
    const shownUsers = useMemo(() => { const term = query.trim().toLowerCase(); return term ? users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(term)) : users; }, [query, users]);

    return <div className="space-y-8">
        <div><h1 className="text-4xl font-black">User Management</h1><p className="text-slate-400 mt-2">View registered accounts and suspend or reactivate user access.</p></div>
        <div className="grid sm:grid-cols-3 gap-5">{[[users.length, "Total accounts"], [admins, "Admin accounts"], [suspended, "Suspended users"]].map(([value, label]) => <div key={label} className="bg-white/5 border border-white/10 rounded-3xl p-6"><h2 className="text-3xl font-black text-cyan-400">{loading ? "—" : value}</h2><p className="text-slate-400 mt-2">{label}</p></div>)}</div>
        {message && <p className="text-green-400">{message}</p>}{error && <p role="alert" className="text-red-400">{error}</p>}
        <div className="relative max-w-md"><FaSearch className="absolute left-4 top-4 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-cyan-400" /></div>
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-x-auto"><table className="w-full text-left"><thead className="border-b border-white/10 text-slate-400"><tr><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4">Status</th><th className="p-4">Joined</th><th className="p-4">Action</th></tr></thead><tbody>
            {shownUsers.map((user) => <tr key={user._id} className="border-b border-white/5"><td className="p-4"><p className="font-semibold">{user.name}</p><p className="text-sm text-slate-400">{user.email}</p></td><td className="p-4"><span className={`px-3 py-1 rounded-full ${user.role === "admin" ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-500/20 text-slate-300"}`}>{user.role === "admin" ? "Admin" : "User"}</span></td><td className="p-4"><span className={`px-3 py-1 rounded-full ${user.isSuspended ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}`}>{user.isSuspended ? "Suspended" : "Active"}</span></td><td className="p-4 text-slate-400">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</td><td className="p-4">{user.role === "user" ? <button disabled={savingId === user._id} onClick={() => updateStatus(user)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold disabled:opacity-50 ${user.isSuspended ? "bg-green-500 text-slate-950" : "bg-red-500/20 text-red-200 hover:bg-red-500/30"}`}>{user.isSuspended ? <FaUserCheck /> : <FaUserSlash />}{savingId === user._id ? "Saving…" : user.isSuspended ? "Reactivate" : "Suspend"}</button> : <span className="text-slate-500 text-sm">Protected</span>}</td></tr>)}
            {!loading && !error && shownUsers.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-slate-400"><FaUsers className="inline mr-2" />No matching accounts found.</td></tr>}{loading && <tr><td colSpan="5" className="p-8 text-center text-slate-400">Loading accounts…</td></tr>}
        </tbody></table></div>
    </div>;
}
