import React, { useEffect, useState } from "react";
import "../app.css";
import "./content.css";
import Files from "./Files";
import Folder from "./Folder";
import useLayout from "../context/LayoutContext";
export default () => {
  const { grid, setGrid } = useLayout();

  var files = [];
  var folders = ["Folder 1"];
  for (var i = 1; i <= 8; i++) {
    files.push("File " + i);
  }
  return (
    <div className="content-box ps-md-4 pt-md-3  p-1 pb-0 m-2 mt-0">
      <div className="py-2 px-2 px-md-0 me-md-4 d-flex justify-content-between">
        <h4>My Drive</h4>
        <div
          className="layout p-1"
          onClick={() => {
            window.localStorage.setItem("grid", !grid);
            console.log("set", !grid);
            console.log("local", localStorage.getItem("grid"));
            setGrid(!grid);
          }}
        >
          {grid && (
            <svg
              className="a-s-fa-Ha-pa c-qd"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              focusable="false"
              fill="currentColor"
            >
              <path d="M3,5v14h18V5H3z M7,7v2H5V7H7z M5,13v-2h2v2H5z M5,15h2v2H5V15z M19,17H9v-2h10V17z M19,13H9v-2h10V13z M19,9H9V7h10V9z"></path>
            </svg>
          )}
          {!grid && (
            <svg
              className="a-s-fa-Ha-pa c-qd"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2,5v14h20V5H2z M14,7v4h-4V7H14z M4,7h4v4H4V7z M16,11V7h4v4H16z M4,17v-4h4v4H4z M10,17v-4h4v4H10z M20,17 h-4v-4h4V17z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          )}
        </div>
      </div>
      <div className="content-body overflow-scroll overflow-x-hidden pe-md-3 px-1 ps-md-0">
        {!grid && (
          <>
            <div className="list-header d-grid align-items-center">
              <h6 className="m-0 ms-3 p-0">Name</h6>
              <h6 className="d-none d-md-grid m-0 p-0">Owner</h6>
              <h6 className="d-none d-sm-grid m-0 p-0">Last modified</h6>
              <h6 className="d-none d-md-grid m-0 p-0">File size</h6>
              <h6 className=" d-grid m-0 p-0 "></h6>
            </div>
            <hr className="m-0 p-0 w-100" />
          </>
        )}
        {grid && <div className={`my-2 mx-md-0 mx-2 `}>Folders</div>}
        <div
          className={` ${
            grid
              ? "container-fluid d-grid gap-md-3 gap-2 align-items-center content p-0 m-0"
              : "list m-0 p-0"
          }`}
        >
          {folders.map((folder) => {
            return <Folder folderName={folder} grid={grid} key={folder} />;
          })}
        </div>
        {grid && <div className="my-2 mx-md-0 mx-2">Files</div>}
        <div
          className={` ${
            grid
              ? "container-fluid d-grid gap-md-3 gap-2 align-items-center content p-0 m-0"
              : ""
          }`}
        >
          {files.map((file) => {
            return <Files fileName={file} grid={grid} key={file} />;
          })}
        </div>
      </div>
    </div>
  );
};
