import HeaderDrive from "./components/HeaderDrive";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Content from "./components/Content";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutProvider } from "./context/LayoutContext";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [grid, setGrid] = useState(
    window.localStorage.getItem("grid") === "false" ? false : true
  );
  useEffect(() => {
    if (location.pathname == "/") navigate("/my-drive");
  });
  return (
    <div className="p-0 body">
      <HeaderDrive />
      <div className="d-inline-flex w-100">
        <Sidebar />
        <LayoutProvider value={{ grid, setGrid }}>
          <Outlet />
        </LayoutProvider>
      </div>
    </div>
  );
}

export default App;
