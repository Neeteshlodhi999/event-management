import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;