import React, { useEffect, useState } from "react";
import NoContent from "./NoContent";
import "./content.css";
import IDK from "./Search";
import Files from "../Files/Files";
import Folder from "../Folder/Folder";
import useLayout from "../../context/LayoutContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
import usePath from "../../context/PathContext";
import ROOT_FOLDER from "../RootFolders";
import Breadcrumb from "./Breadcrumb";
import Layout from "./Layout";
import SearchItems from "./SearchItems";
import { Loading } from "../Loading";
import useAuth from "../../context/UserContext";
import Progress from "../Progress/Progress";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export default () => {
  const { grid, setGrid } = useLayout();
  const { path, myDriveId, setMyDriveId, setPath, setFolderID, folderID } =
    usePath();
  const params = useParams();
  const [folder, setFolder] = useState([]);
  const [breadcrumbPath, setbreadcrumbPath] = useState([]);
  const [file, setFile] = useState([]);
  const location = useLocation();
  const [error, setError] = useState(false);
  const folderRef = collection(db, "Folders");
  const fileRef = collection(db, "Files");
  const [folderLoading, setFolderLoading] = useState(true);
  const [fileLoading, setFileLoading] = useState(true);
  const [URI, setURI] = useState("");
  const { authLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    var folderUnsub, fileUnsub;

    const fetchData = async () => {
      const user = auth.currentUser.uid;
      setFile([]);
      setFolder([]);
      let folderQuery, fileQuery;

      try {
        if (myDriveId == null) {
          const mydrivequery = query(
            folderRef,
            where("id", "==", "my-drive"),
            where("owner", "==", user)
          );
          const querySnap = await getDocs(mydrivequery);
          querySnap.forEach((doc) => {
            setMyDriveId(doc.id);
          });
        }

        if (params.search) {
          const searchParam = params.search;

          IDK({ setFolder, setFile, searchParam });
          setFolderLoading(false);
          setFileLoading(false);
        } else {
          if (params.name) {
            if (params.name in ROOT_FOLDER) {
              const q = query(
                folderRef,
                where("id", "==", params.name),
                where("owner", "==", user)
              );
              const rootSnaps = await getDocs(q);
              rootSnaps.forEach((rootSnap) => {
                if (params.name === "my-drive" && myDriveId == null) {
                  setMyDriveId(rootSnap.id);
                }
                setPath(rootSnap.data().path);
                setbreadcrumbPath(rootSnap.data().path);
                setFolderID(rootSnap.id);
                folderQuery = query(
                  folderRef,
                  where("parent", "==", rootSnap.id),
                  where("owner", "==", user),
                  where("deleted", "==", false)
                );
                fileQuery = query(
                  fileRef,

                  where("parent", "==", rootSnap.id),
                  where("owner", "==", user),
                  where("deleted", "==", false)
                );
              });
              if (params.name === "trash") {
                folderQuery = query(
                  folderRef,
                  where("owner", "==", user),
                  where("rootDeleted", "==", true)
                );
                fileQuery = query(
                  fileRef,
                  where("owner", "==", user),
                  where("rootDeleted", "==", true)
                );
              }
              if (params.name === "starred") {
                folderQuery = query(
                  folderRef,
                  where("owner", "==", user),
                  where("starred", "==", true)
                );
                fileQuery = query(
                  collection(db, "Files"),
                  where("starred", "==", true),
                  where("owner", "==", user)
                );
              }
            } else {
              throw new Error("Invalid URLs");
            }
          } else if (params.folderId) {
            const docRef = doc(db, "Folders", params.folderId);
            var docSnap;
            try {
              docSnap = await getDoc(docRef);
            } catch (error) {
              throw error;
            }
            if (!docSnap.exists()) throw new Error("Invalid URL");
            if (docSnap.data().deleted) {
              navigate("/drive/trash", { replace: true });
            }
            setPath(docSnap.data().path);
            setbreadcrumbPath(docSnap.data().path);
            setFolderID(docSnap.id);
            folderQuery = query(
              folderRef,
              where("parent", "==", params.folderId),
              where("owner", "==", user),
              where("deleted", "==", false)
            );
            fileQuery = query(
              collection(db, "Files"),
              where("parent", "==", params.folderId),
              where("owner", "==", user),
              where("deleted", "==", false)
            );
          }
          folderUnsub = onSnapshot(folderQuery, (folderSnap) => {
            setFolder(folderSnap.docs.map((folders) => folders.data()));
            setFolderLoading(false);
          });

          fileUnsub = onSnapshot(fileQuery, (fileSnap) => {
            setFile(fileSnap.docs.map((files) => files.data()));
            setFileLoading(false);
          });
        }
      } catch (error) {
        setError(error);
      }
    };
    setFolderLoading(true);
    setFileLoading(true);
    if (authLoaded) {
      fetchData();
    }
    return () => {
      if (folderUnsub) folderUnsub();
      if (fileUnsub) fileUnsub();
    };
  }, [location, authLoaded]);

  if (error) {
    throw error;
  }
  return (
    <div className="ps-md-3 pt-md-3 ps-2 p-0 pb-0 m-md-2 mt-0 h-100">
      <div className="py-2 px-2 px-md-0 me-md-4 d-flex justify-content-between">
        <Breadcrumb path={breadcrumbPath} />
        <Layout />
      </div>
      {folderLoading || fileLoading ? (
        <Loading />
      ) : (
        <div className="content-body overflow-scroll overflow-x-hidden  px-0 px-md-3 ">
          {params.name && file.length + folder.length == 0 && (
            <NoContent
              src={ROOT_FOLDER[params.name].src}
              header={ROOT_FOLDER[params.name].header}
              para={ROOT_FOLDER[params.name].para}
            />
          )}

          {folder.length + file.length != 0 && (
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
      )}
      <ToastContainer transition={Zoom} />
    </div>
  );
};
