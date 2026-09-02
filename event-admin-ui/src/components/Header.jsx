import { useEffect, useState } from "react";
import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

export default function Header() {
  const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem("adminUser") || "{}"));
  useEffect(() => {
    const refresh = () => setAdmin(JSON.parse(localStorage.getItem("adminUser") || "{}"));
    window.addEventListener("admin-user-updated", refresh);
    return () => window.removeEventListener("admin-user-updated", refresh);
  }, []);
  return (
    <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">

      <div className="px-6 py-4 flex justify-between items-center">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-slate-500" />

          <input
            placeholder="Search events..."
            className="bg-slate-800 rounded-xl pl-12 pr-5 py-3 outline-none w-80"
          />

        </div>

        <div className="flex items-center gap-4">

          <button className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
            <FaBell />
          </button>

          <img
            src={admin.image || "https://i.pravatar.cc/150?img=12"}
            alt=""
            className="w-12 h-12 rounded-full"
          />

        </div>

      </div>

    </header>
  );
}
