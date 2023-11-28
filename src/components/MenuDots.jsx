import React from "react";
import { useParams } from "react-router-dom";
import { folderDelete } from "./functions/folderDelete";
import { fileDelete } from "./functions/fileDelete";
import { downloadFile } from "./functions/downloadFile";
import usePath from "../context/PathContext";
import SVG from "./SVG";
import RenameFile from "./Files/RenameFile";
import RenameFolder from "./Folder/RenameFolder";
export default (props) => {
  const params = useParams();
  const { folderID } = usePath();
  const folder = props.folder;
  const file = props.file;
  return (
    <>
      <div
        className="d-flex align-items-center three-dots p-1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-three-dots-vertical "
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </div>

      <ul className="dropdown-menu">
        {params.name && params.name == "trash" && (
          <>
            <li>
              <a
                className="dropdown-item d-flex align-items-center gap-3"
                onClick={() => downloadFile(props.file)}
              >
                <SVG
                  path={[
                    "M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z",
                  ]}
                />
                Restore
              </a>
            </li>
            <li>
              <a
                className="dropdown-item d-flex align-items-center gap-3"
                onClick={() => downloadFile(props.file)}
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  focusable="false"
                  className=" c-qd a-s-fa-Ha-pa"
                >
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 8h2v9H9zm4 0h2v9h-2z"></path>
                </svg>
                Delete forever
              </a>
            </li>
          </>
        )}
        {!(params.name && params.name == "trash") && (
          <>
            <li>
              <a
                className="dropdown-item d-flex align-items-center gap-3"
                onClick={() => downloadFile(props.file)}
              >
                <SVG
                  path={[
                    "M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z",
                  ]}
                />
                Download
              </a>
            </li>
            <li>
              <div
                onClick={(event) => event.stopPropagation()}
                className="dropdown-item d-flex align-items-center gap-3"
                data-bs-toggle="modal"
                data-bs-target={folder ? "#renameFolder" : "#renameFile"}
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  focusable="false"
                  fill="currentColor"
                  className="a-s-fa-Ha-pa c-qd BMAFpd"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18.41 5.8L17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"></path>
                </svg>
                Rename
              </div>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <a
                className="dropdown-item d-flex align-items-center gap-3"
                href="#"
              >
                <SVG
                  path={[
                    "M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z",
                  ]}
                />
                Share
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <a
                className="dropdown-item d-flex align-items-center gap-3"
                onClick={(event) => {
                  event.stopPropagation();
                  if (props.folder) folderDelete(props.folder, folderID);
                  if (props.file) fileDelete(props.file, folderID);
                }}
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  focusable="false"
                  className=" c-qd a-s-fa-Ha-pa"
                >
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 8h2v9H9zm4 0h2v9h-2z"></path>
                </svg>
                Move to trash
              </a>
            </li>
          </>
        )}
      </ul>
    </>
  );
};
