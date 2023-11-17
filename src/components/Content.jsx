import React from "react";
import "../app.css";
import "./content.css";
import Files from "./Files";
import Folder from "./Folder";
export default () => {
  return (
    <div className="content-body px-md-4 pt-md-3  p-1 pb-0 m-0 overflow-scroll overflow-x-hidden">
      <h4 className="py-2 px-2 px-md-0">My Drive</h4>
      <div className="my-2 mx-md-0 mx-2">Folders</div>
      <div className="container-fluid d-grid gap-md-3 gap-2 align-items-center content p-0 m-0">
        <Folder />
      </div>
      <div className="my-2 mx-md-0 mx-2">Files</div>
      <div className="container-fluid d-grid gap-md-3 gap-2 align-items-center content p-0 m-0">
        <Files />
        <Files />
        <Files />
        <Files />
        <Files />
        <Files />
        <Files />
        <Files />
      </div>
    </div>
  );
};
