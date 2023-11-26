import React, { useEffect, useState } from "react";
import NoContent from "../NoContent";
import "./content.css";
import Files from "../Files/Files";
import Folder from "../Folder/Folder";
import useLayout from "../../context/LayoutContext";
import useUser from "../../context/UserContext";

import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
import usePath from "../../context/PathContext";
import ROOT_FOLDER from "../RootFolders";
import Breadcrumb from "./Breadcrumb";
export default () => {
  const { grid, setGrid } = useLayout();
  const { path, setPath, setFolderID, folderID } = usePath();
  const params = useParams();
  const [folder, setFolder] = useState(null);
  const [file, setFile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("uid");
  useEffect(() => {
    console.log("in");
    setFile(null);
    setFolder(null);
    if (user) {
      if (params.name) {
        if (params.name in ROOT_FOLDER) {
          try {
            console.log(params.name);
            const q = query(
              collection(db, "Folders"),
              where("id", "==", params.name),
              where("owner", "==", user)
            );
            const unsubscribe = onSnapshot(
              q,
              (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log(doc.id, " => ", doc.data());
                  setPath(doc.data().path);
                  setFolderID(doc.id);
                  setFolder(doc.data().folders);
                  setFile(doc.data().files);
                  console.log("Content folder", doc.data().folders);
                });
              },
              (error) => {
                console.log(error);
              }
            );
          } catch (error) {
            console.log(error);
          }
        } else {
          throw new Error("Invalid URL");
        }
      } else if (params.folderId) {
        try {
          const docRef = doc(db, "Folders", params.folderId);
          const unsub = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              setPath(docSnap.data().path);
              setFolderID(docSnap.id);
              setFolder(docSnap.data().folders);
              setFile(docSnap.data().files);
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [location.pathname]);
  return (
    <div className="content-box ps-md-4 pt-md-3  p-1 pb-0 m-2 mt-0">
      <div className="py-2 px-2 px-md-0 me-md-4 d-flex justify-content-between">
        <h4>
          <Breadcrumb path={path} />
        </h4>
        <div
          className="layout p-1"
          onClick={() => {
            window.localStorage.setItem("grid", !grid);
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
      <div className="content-body overflow-scroll overflow-x-hidden pe-md-3 px-1 px-md-3 ">
        {params.name && file && folder && file.length + folder.length == 0 && (
          <>
            {console.log("check", file, folder)}
            <NoContent
              src={ROOT_FOLDER[params.name].src}
              header={ROOT_FOLDER[params.name].header}
              para={ROOT_FOLDER[params.name].para}
            />
          </>
        )}
        {file && folder && folder.length + file.length != 0 && (
          <>
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
            {grid && folder.length != 0 && (
              <div className={`my-2 mx-md-0 mx-2 `}>Folders</div>
            )}
            <div
              className={` ${
                grid
                  ? "container-fluid d-grid gap-md-3 gap-2 align-items-center content p-0 m-0"
                  : "list m-0 p-0"
              }`}
            >
              {folder.map((folder) => {
                return (
                  <Folder
                    folderName={folder.name}
                    grid={grid}
                    key={folder.id}
                    id={folder.id}
                  />
                );
              })}
            </div>
            {grid && file.length != 0 && (
              <div className="my-2 mx-md-0 mx-2">Files</div>
            )}
            <div
              className={` ${
                grid
                  ? "container-fluid d-grid gap-md-3 gap-2 align-items-center content p-0 m-0"
                  : ""
              }`}
            >
              {file.map((file) => {
                console.log("files", file);
                return <Files fileName={file.name} grid={grid} key={file} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
