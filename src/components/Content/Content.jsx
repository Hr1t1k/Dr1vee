import React, { useEffect, useState } from "react";
import NoContent from "./NoContent";
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
import Layout from "./Layout";
export default () => {
  const { grid, setGrid } = useLayout();
  const { path, setPath, setFolderID, folderID } = usePath();
  const params = useParams();
  const [folder, setFolder] = useState(["NULL"]);
  const [file, setFile] = useState(["NULL"]);
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("uid");
  useEffect(() => {
    setFile(["NULL"]);
    setFolder(["NULL"]);
    if (user) {
      if (params.name) {
        if (params.name in ROOT_FOLDER) {
          try {
            const q = query(
              collection(db, "Folders"),
              where("id", "==", params.name),
              where("owner", "==", user)
            );
            const unsubscribe = onSnapshot(
              q,
              (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  setPath(doc.data().path);
                  setFolderID(doc.id);

                  const folderQuery = query(
                    collection(db, "Folders"),
                    where("parent", "==", doc.id)
                  );
                  onSnapshot(folderQuery, (folderSnap) => {
                    var x = 0;
                    folderSnap.forEach((folders) => {
                      if (x == 0) setFolder([folders.data()]);
                      else
                        setFolder((prevFolder) => [
                          ...prevFolder,
                          folders.data(),
                        ]);

                      x++;
                    });
                    if (x == 0) setFolder([]);
                  });
                  const fileQuery = query(
                    collection(db, "Files"),
                    where("parent", "==", doc.id)
                  );
                  onSnapshot(fileQuery, (fileSnap) => {
                    var x = 0;
                    fileSnap.forEach((files) => {
                      if (x == 0) setFile([files.data()]);
                      else setFile((prevfiles) => [...prevfiles, files.data()]);
                      x++;
                    });
                    if (x == 0) setFile([]);
                  });
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
              const folderQuery = query(
                collection(db, "Folders"),
                where("parent", "==", params.folderId)
              );
              onSnapshot(folderQuery, (folderSnap) => {
                var x = 0;

                folderSnap.forEach((folders) => {
                  if (x == 0) setFolder([folders.data()]);
                  else
                    setFolder((prevfolder) => [...prevfolder, folders.data()]);
                  x++;
                });
                if (x == 0) {
                  setFolder([]);
                }
              });
              const fileQuery = query(
                collection(db, "Files"),
                where("parent", "==", params.folderId)
              );

              onSnapshot(fileQuery, (fileSnap) => {
                var x = 0;

                fileSnap.forEach((files) => {
                  if (x == 0) setFile([files.data()]);
                  else setFile((prevfile) => [...prevfile, files.data()]);
                  x++;
                });
                if (x == 0) {
                  setFile([]);
                }
              });
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
              throw new error("invalid url");
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
        <Layout />
      </div>
      <div className="content-body overflow-scroll overflow-x-hidden pe-md-3 px-1 px-md-3 ">
        {params.name &&
          file &&
          folder &&
          file[0] != "NULL" &&
          folder[0] != "NULL" &&
          file.length + folder.length == 0 && (
            <>
              <NoContent
                src={ROOT_FOLDER[params.name].src}
                header={ROOT_FOLDER[params.name].header}
                para={ROOT_FOLDER[params.name].para}
              />
            </>
          )}
        {(file.length == 0 || file[0] != "NULL") &&
          (folder.length == 0 || folder[0] != "NULL") &&
          folder.length + file.length != 0 && (
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
                    : ""
                }`}
              >
                {folder.map((folder) => {
                  return <Folder folder={folder} key={folder.id} grid={grid} />;
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
                  return <Files file={file} grid={grid} key={file.id} />;
                })}
              </div>
            </>
          )}
      </div>
    </div>
  );
};
