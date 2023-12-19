import React from "react";
import useLayout from "../../context/LayoutContext";
import SVG from "../SVG";
const Layout = () => {
  const { grid, setGrid } = useLayout();

  return (
    <div
      className="layout d-flex align-items-center justify-content-center m-2"
      style={{ width: "30px", height: "30px" }}
      onClick={() => {
        window.localStorage.setItem("grid", !grid);
        setGrid(!grid);
      }}
    >
      {grid && (
        <SVG
          path={[
            "M3,5v14h18V5H3z M7,7v2H5V7H7z M5,13v-2h2v2H5z M5,15h2v2H5V15z M19,17H9v-2h10V17z M19,13H9v-2h10V13z M19,9H9V7h10V9z",
          ]}
        />
      )}
      {!grid && (
        <SVG
          path={[
            "M2,5v14h20V5H2z M14,7v4h-4V7H14z M4,7h4v4H4V7z M16,11V7h4v4H16z M4,17v-4h4v4H4z M10,17v-4h4v4H10z M20,17 h-4v-4h4V17z",
          ]}
        />
      )}
    </div>
  );
};

export default Layout;
