import { Outlet, Route, Routes } from 'react-router-dom';

// routes
import Public from "./routers/PublicRoute";
import ProtectedRoute from './routers/ProtectedRouter';

// pages
import Home from './pages/home';
import Events from './pages/UserEvents';
import Contact from './pages/contract';
import NotFoundPage from './pages/error 404';
import Auth from './pages/auth';
import EventDetailsPage from './pages/UserEventDetailsLive';
import GalleryPage from './pages/photogallery';

// dashboard pages
import Dashboard from './pages/dashboard/userdash';
import Profile from './pages/dashboard/profile';
import MyTickets from './pages/dashboard/UserTickets';
import ChangePassword from './pages/dashboard/changepass';
import SavedEvents from './pages/dashboard/savedevents';
import UserNotifications from './pages/dashboard/UserNotifications';
import TicketView from './pages/dashboard/TicketView';

export default function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path='/' element={<Public />}>
        <Route index element={<Home />} />

        <Route path='events' element={<Outlet />}>
          <Route index element={<Events />} />
          <Route path='details' element={<EventDetailsPage />} />
        </Route>

        <Route path='photo-gallery' element={<GalleryPage />} />
        <Route path='contact' element={<Contact />} />
        <Route path='auth' element={<Auth />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>

      {/* Protected Routes */}
      <Route path='/dashboard' element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path='profile' element={<Profile />} />
        <Route path='my-tickets' element={<MyTickets />} />
        <Route path='ticket' element={<TicketView />} />
        <Route path='saved-events' element={<SavedEvents />} />
        <Route path='notifications' element={<UserNotifications />} />
        <Route path='change-password' element={<ChangePassword />} />
      </Route>

    </Routes>
  );
}
