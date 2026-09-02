import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from '../pages/dashboard/index';

export default function ProtectedRoute() {
  const isLogin = Boolean(localStorage.getItem('accessToken'));

  return isLogin ? (
    <Dashboard>
      <Outlet />
    </Dashboard>
  ) : (
    <Navigate to="/auth" />
  );
}
