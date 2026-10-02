import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function TeamMembers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("adminAccessToken");

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await fetch(`${API}/users?limit=100`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await response.json();
                if (!response.ok || !result.status) {
                    if (response.status === 401) {
                        localStorage.removeItem("adminAccessToken");
                        localStorage.removeItem("adminUser");
                        navigate("/admin/login");
                        return;
                    }
                    throw new Error(result.message || "Unable to load accounts.");
                }
                setUsers(Array.isArray(result.data) ? result.data : []);
            } catch (requestError) {
                setError(requestError.message || "Unable to load accounts.");
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, [navigate, token]);

    const admins = useMemo(() => users.filter((user) => user.role === "admin").length, [users]);
    const members = users.length - admins;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black">Accounts</h1>
                <p className="text-slate-400 mt-2">Registered accounts and their current access roles.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
                {[[users.length, "Total accounts"], [admins, "Admin accounts"], [members, "User accounts"]].map(([value, label]) => (
                    <div key={label} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h2 className="text-3xl font-black text-cyan-400">{loading ? "—" : value}</h2>
                        <p className="text-slate-400 mt-2">{label}</p>
                    </div>
                ))}
            </div>

            {error && <p role="alert" className="text-red-400">{error}</p>}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-white/10 text-slate-400">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-white/5">
                                <td className="p-4 font-semibold">{user.name}</td>
                                <td className="p-4 text-slate-300">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full ${user.role === "admin" ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-500/20 text-slate-300"}`}>
                                        {user.role === "admin" ? "Admin" : "User"}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-400">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                                </td>
                            </tr>
                        ))}
                        {!loading && !error && users.length === 0 && (
                            <tr><td colSpan="4" className="p-8 text-center text-slate-400">No accounts found.</td></tr>
                        )}
                        {loading && (
                            <tr><td colSpan="4" className="p-8 text-center text-slate-400">Loading accounts…</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
