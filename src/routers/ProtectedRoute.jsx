import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  //   console.log(currentUser);

  return currentUser ? children : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
