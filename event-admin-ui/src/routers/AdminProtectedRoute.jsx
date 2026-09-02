import { Navigate, Outlet, useLocation } from "react-router";

export default function AdminProtectedRoute() {
  const location = useLocation();
  const token = localStorage.getItem("adminAccessToken");
  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");

  if (!token || user.role !== "admin") {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminUser");
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
