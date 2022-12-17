import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  //   console.log(currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
