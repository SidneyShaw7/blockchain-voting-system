// import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface PrivateRouteProps {
  redirectTo: string;
}

const PrivateRoute = ({ redirectTo }: PrivateRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
