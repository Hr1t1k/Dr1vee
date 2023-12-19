import HeaderDrive from "./components/Header/HeaderDrive";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutProvider } from "./context/LayoutContext";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebasecofig";
import GoogleSignin from "./components/GoogleSignin";
import { PathProvider } from "./context/PathContext";

function App() {
  const [path, setPath] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [folderID, setFolderID] = useState(null);
  const navigate = useNavigate();
  const [size, setSize] = useState(0);
  const [myDriveId, setMyDriveId] = useState(null);
  const location = useLocation();
  const [grid, setGrid] = useState(
    window.localStorage.getItem("grid") === "false" ? false : true
  );
  useEffect(() => {
    console.log("start", new Date().getTime());
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("end", new Date().getTime());
        if (location.pathname == "/") navigate("/my-drive");
        setLoaded(true);
      } else {
        setLoaded(false);
        GoogleSignin();
      }
    });
  }, []);

  return (
    <>
      {loaded ? (
        <div className="p-0 body">
          <HeaderDrive />

          <div className="d-inline-flex w-100">
            <PathProvider
              value={{
                path,
                setPath,
                folderID,
                setFolderID,
                size,
                setSize,
                myDriveId,
                setMyDriveId,
              }}
            >
              <Sidebar />
              <LayoutProvider value={{ grid, setGrid }}>
                <Outlet />
              </LayoutProvider>
            </PathProvider>
          </div>
        </div>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div
            class="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
