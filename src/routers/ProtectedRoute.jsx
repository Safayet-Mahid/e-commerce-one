import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  //   console.log(currentUser);

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} state={location} />
  );
};

export default ProtectedRoute;
