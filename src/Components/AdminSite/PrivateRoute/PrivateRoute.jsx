import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const isLoggedIn = !!Cookies.get('accessToken') || !!Cookies.get('refreshToken');
  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
};

export default PrivateRoute;
