import { Routes, Route } from "react-router";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import CreateEvent from "./pages/EventForm";
import Attendees from "./pages/Attendees";
import Revenue from "./pages/LiveRevenue";
import Reports from "./pages/LiveReports";
import Settings from "./pages/LiveSettings";
import Notifications from "./pages/LiveNotifications";
import TeamMembers from "./pages/TeamMembers";
import AdminLogin from "./pages/AdminLogin";
import Profile from "./pages/AdminProfile";
import ContactMessages from "./pages/ContactMessages";
import AdminProtectedRoute from "./routers/AdminProtectedRoute";


function App() {
  return (
    <Routes>
      <Route element={<AdminProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/attendees" element={<Attendees />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/team" element={<TeamMembers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact-messages" element={<ContactMessages />} />
      </Route>
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
