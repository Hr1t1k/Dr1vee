import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  if (localStorage.getItem("signedIn"))
    return <Navigate to="/drive/my-drive" replace />;
  else return <Navigate to="/login" replace />;
};

export default Home;
