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
  const [grid, setGrid] = useState(
    window.localStorage.getItem("grid") === "false" ? false : true
  );
  onAuthStateChanged(auth, (user) => {
    console.log("inside auth");
    if (user) {
      // setUser(true);
      console.log("in");
      if (location.pathname == "/") navigate("/My Drive");
    } else {
      // setUser(false);
      console.log("out");
      GoogleSignin();
    }
  });

  return (
    <>
      {
        <div className="p-0 body">
          <HeaderDrive />
          <div className="d-inline-flex w-100">
            <Sidebar />
            <LayoutProvider value={{ grid, setGrid }}>
              <Outlet />
            </LayoutProvider>
          </div>
        </div>
      }
    </>
  );
}

export default App;
