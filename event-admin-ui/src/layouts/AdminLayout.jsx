import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Header />

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
