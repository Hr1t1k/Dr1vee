import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  if (!localStorage.getItem("signedIn")) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
