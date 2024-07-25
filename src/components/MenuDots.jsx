import React from "react";
import { useParams } from "react-router-dom";
import fileDelete from "./functions/fileDelete";
import { downloadFile } from "./functions/downloadFile";
import SVG from "./SVG";
import addStarred from "./functions/addStarred";
import restore from "./functions/restore";
import deletePerm from "./functions/deletePerm";
import usePath from "../context/PathContext";
import downloadFolder from "./functions/downloadFolder";
import { toast } from "react-toastify";
import ShareBtn from "./ShareBtn/ShareBtn";
export default (props) => {
  const params = useParams();
  const folder = props.folder;
  const file = props.file;

  const id = file ? file.id : folder.id;
  const name = file ? file.name : folder.name;
  const sharedWith = file ? file.sharedWith : folder.sharedWith;
  const { myDriveId } = usePath();
  const type = file ? 1 : 0;
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

      <ul
        className="dropdown-menu"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {params.name && params.name == "trash" && (
          <>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-3"
                onClick={(e) => {
                  restore(id, type, file ? file : folder, myDriveId);
                }}
              >
                <SVG
                  path={[
                    "M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z",
                  ]}
                />
                Restore
              </button>
            </li>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-3"
                onClick={() => {
                  deletePerm(id, type);
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
                Delete forever
              </button>
            </li>
          </>
        )}
        {!(params.name && params.name == "trash") && (
          <>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-3"
                onClick={() => {
                  file
                    ? downloadFile(file.downloadURL, file.name)
                    : downloadFolder(id);
                  toast.info("Starting download", { theme: "colored" });
                }}
              >
                <SVG
                  path={[
                    "M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z",
                  ]}
                />
                Download
              </button>
            </li>
            <li>
              <div
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
              <ShareBtn
                sharedWith={file ? file.sharedWith : folder.sharedWith}
                id={id}
                type={type}
                name={name}
              />
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-3"
                onClick={() => {
                  addStarred(id, type, type ? file.starred : folder.starred);
                }}
              >
                <svg
                  className=" c-qd"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  focusable="false"
                  fill="currentColor"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
                {(folder && folder.starred) || (file && file.starred)
                  ? "Remove from starred"
                  : "Add to starred"}
              </button>
            </li>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-3"
                onClick={() => {
                  fileDelete(id, type);
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
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
};
