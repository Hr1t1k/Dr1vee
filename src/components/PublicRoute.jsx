import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import auth from "../../firebasecofig";

const PublicRoute = () => {
  const user = auth.currentUser;

  const { pathname } = useLocation();
  const publicRoutes = ["/login", "/register"];
  if (!publicRoutes.includes(pathname)) return;
  if (localStorage.getItem("signedIn")) {
    console.log(localStorage.getItem("signedIn"), pathname);
    return <Navigate to="/drive/my-drive" replace />;
  }
  // if (localStorage.getItem("signedIn")) return <Navigate to="/drive" replace />;
  if (pathname == "/") return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default PublicRoute;
