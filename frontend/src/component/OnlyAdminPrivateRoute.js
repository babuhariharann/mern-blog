import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const OnlyAdminPrivateRoute = () => {

  const { currentUser } = useSelector((state) => state?.user);
  const { isAdmin } = currentUser
  return isAdmin ? <Outlet /> : <Navigate to="/" />
}

export default OnlyAdminPrivateRoute