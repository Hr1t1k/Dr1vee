import React, { useState } from "react";
import HeaderDrive from "./Header/HeaderDrive.jsx";
import Sidebar from "./Sidebar/Sidebar";
import { LayoutProvider } from "../context/LayoutContext";
import { PathProvider } from "../context/PathContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Progress from "./Progress/Progress.jsx";
import { ProgressProvider } from "../context/ProgressContext.js";
const Drive = () => {
  const [path, setPath] = useState([]);
  const { pathname } = useLocation();

  const [folderID, setFolderID] = useState(null);
  const [size, setSize] = useState(0);
  const [myDriveId, setMyDriveId] = useState(null);
  const [grid, setGrid] = useState(
    window.localStorage.getItem("grid") === "false" ? false : true
  );
  const [downloads, setDownloads] = useState([]);
  const [uploads, setUploads] = useState([]);
  if (pathname == "/drive") return <Navigate to="/drive/my-drive" replace />;
  return (
    <div className="p-0 body">
      <HeaderDrive />
      <div className="d-inline-flex w-100">
        <ProgressProvider value={{ setUploads, setDownloads }}>
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
            <div className="content-box p-0">
              <LayoutProvider value={{ grid, setGrid }}>
                <Outlet />
              </LayoutProvider>
            </div>
          </PathProvider>
        </ProgressProvider>
      </div>
      <ProgressProvider value={{ uploads, downloads, setUploads }}>
        <Progress />
      </ProgressProvider>
    </div>
  );
};

export default Drive;
