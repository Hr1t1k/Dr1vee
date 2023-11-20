import HeaderDrive from "./components/HeaderDrive";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutProvider } from "./context/LayoutContext";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebasecofig";
import GoogleSignin from "./components/GoogleSignin";

function App() {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const uid = localStorage.getItem("uid");
  const [grid, setGrid] = useState(
    window.localStorage.getItem("grid") === "false" ? false : true
  );
  console.log("auth.currentUser", auth.currentUser);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true);
      if (location.pathname == "/") navigate("/My Drive");
      console.log("user signed in ");
    } else {
      setUser(false);
      console.log("Not signed in");
      GoogleSignin();
    }
  });

  return (
    <>
      {user && (
        <div className="p-0 body">
          <HeaderDrive />
          <div className="d-inline-flex w-100">
            <Sidebar />
            <LayoutProvider value={{ grid, setGrid }}>
              <Outlet />
            </LayoutProvider>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
