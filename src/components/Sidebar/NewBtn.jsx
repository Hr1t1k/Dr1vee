import React, { useRef, useState } from "react";
import { getStorage } from "firebase/storage";
import ModalNewfolder from "./ModalNewfolder";
import SVG from "../SVG";
import usePath from "../../context/PathContext";
import uploadFolder from "../functions/uploadFolder";
import uploadFile from "../functions/uploadFile";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default () => {
  const inputFile = useRef(null);
  const inputFolder = useRef(null);
  const storage = getStorage();
  const navigate = useNavigate();
  const { path, folderID, setSize, myDriveId } = usePath();
  var uploadPath;
  var uploadFolderId;
  if (path[0] && path[0].id == "my-drive") {
    uploadFolderId = folderID;
    uploadPath = path;
  } else {
    uploadPath = [{ id: "my-drive", name: "My drive" }];
    uploadFolderId = myDriveId;
  }
  return (
    <>
      <ModalNewfolder />

      <div className="dropdown">
        <button
          type="button"
          role="button"
          className="NewBtn p-3 m-2 ms-0 mb-3 rounded-4 shadow-sm d-flex gap-2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-disabled="false"
          aria-haspopup="true"
          data-bs-offset="-10,-60"
        >
          <SVG path={["M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"]} />
          <p className="p-0 mx-1">New</p>
        </button>

        <ul className="dropdown-menu shadow-sm border-0">
          {/* New Folder */}
          <li>
            <button
              className="btn dropdown-item d-flex align-items-center gap-3"
              data-bs-dismiss="offcanvas"
              data-bs-toggle="modal"
              data-bs-target="#new-folder"
            >
              <SVG
                path={[
                  "M12 12h2v-2h2v2h2v2h-2v2h-2v-2h-2v-2zm10-4v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2l.01-12c0-1.1.89-2 1.99-2h6l2 2h8c1.1 0 2 .9 2 2zm-2 0H4v10h16V8z",
                ]}
              />
              New Folder
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          {/* File Upload */}
          <li>
            <button
              className="btn dropdown-item d-flex align-items-center gap-3"
              onClick={() => inputFile.current.click()}
            >
              <SVG
                path={[
                  "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z",
                  "M8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z",
                ]}
              />
              File Upload
            </button>
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={(event) => {
                if (event.target.files[0])
                  uploadFile(
                    event.target.files[0],
                    uuidv4(),
                    uploadFolderId,
                    uploadPath,
                    setSize
                  );
                event.target.value = "";
              }}
            />
          </li>

          {/* //Folder Upload */}

          <li>
            <button
              className="btn dropdown-item d-flex align-items-center gap-3"
              onClick={() => inputFolder.current.click()}
            >
              <SVG
                path={[
                  "M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z",
                ]}
              />
              Folder Upload
            </button>
            <input
              directory=""
              webkitdirectory=""
              type="file"
              ref={inputFolder}
              style={{ display: "none" }}
              onChange={(event) => {
                if (event.target.files)
                  uploadFolder(event.target.files, uploadFolderId, uploadPath);
                event.target.value = null;
                // if (path[0] && path[0].id != "my-drive") navigate("/my-drive");
              }}
            />
          </li>
        </ul>
      </div>
    </>
  );
};
