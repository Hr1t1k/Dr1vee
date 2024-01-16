import React, { useEffect, useState } from "react";
import NoContent from "./NoContent";
import "./content.css";
import Files from "../Files/Files";
import Folder from "../Folder/Folder";
import useLayout from "../../context/LayoutContext";
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
  and,
  or,
  orderBy,
} from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
import usePath from "../../context/PathContext";
import ROOT_FOLDER from "../RootFolders";
import Breadcrumb from "./Breadcrumb";
import Layout from "./Layout";
import { connectStorageEmulator } from "firebase/storage";
export default () => {
  const { grid, setGrid } = useLayout();
  const { path, myDriveId, setMyDriveId, setPath, setFolderID, folderID } =
    usePath();
  const params = useParams();
  const [folder, setFolder] = useState(["NULL"]);
  const [breadcrumbPath, setbreadcrumbPath] = useState([]);
  const [file, setFile] = useState(["NULL"]);
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser.uid;
  const [error, setError] = useState(false);
  const folderRef = collection(db, "Folders");
  // const [err,setErr]=useState("");
  useEffect(() => {
    setFile(["NULL"]);
    setFolder(["NULL"]);
    if (user) {
      if (myDriveId == null) {
        const mydrivequery = query(
          folderRef,
          where("id", "==", "my-drive"),
          where("owner", "==", user)
        );
        getDocs(mydrivequery).then((querySnap) => {
          querySnap.forEach((doc) => {
            setMyDriveId(doc.id);
          });
        });
      }
      if (params.name) {
        if (params.name in ROOT_FOLDER) {
          try {
            const q = query(
              folderRef,
              where("id", "==", params.name),
              where("owner", "==", user)
            );
            const unsubscribe = onSnapshot(
              q,
              (querySnapshot) => {
                var tempPath = [];
                querySnapshot.forEach((doc) => {
                  if (params.name == "my-drive" && myDriveId == null)
                    setMyDriveId(doc.id);
                  setPath(doc.data().path);
                  tempPath = [doc.data().path[0]];
                  const q = query(
                    folderRef,
                    where("id", "in", doc.data().path),
                    where("owner", "==", user),
                    orderBy("createdat")
                  );

                  getDocs(q)
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        tempPath = [
                          ...tempPath,
                          { id: doc.data().id, name: doc.data().name },
                        ];
                      });
                    })
                    .then((x) => {
                      setbreadcrumbPath(tempPath);
                    });

                  setFolderID(doc.id);
                  var folderQuery;
                  params.name == "trash"
                    ? (folderQuery = query(
                        folderRef,
                        where("parent", "==", doc.id),
                        where("owner", "==", user),
                        where("deleted", "==", true)
                      ))
                    : (folderQuery = query(
                        folderRef,
                        where("parent", "==", doc.id),
                        where("owner", "==", user),
                        where("deleted", "==", false)
                      ));
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
                    and(
                      where("parent", "==", doc.id),
                      where("owner", "==", user),
                      or(
                        where("deleted", "==", false),
                        where("parent", "==", "trash")
                      )
                    )
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
          throw new Error("Invalid URLs");
        }
      } else if (params.folderId) {
        // const docRef = query(
        //   collection(db, "Folders"),
        //   where("id", "==", params.folderId)
        //   // where("owner", "==", user)
        // );
        const docRef = doc(db, "Folders", params.folderId);
        var tempPath = [];
        try {
          const unsub = onSnapshot(
            docRef,
            (docSnap) => {
              // try {
              var cnt = 0;
              if (docSnap.exists()) {
                // if (docSnap.data().deleted && docSnap.data().deleted == true)
                //   navigate("/trash");
                cnt++;
                tempPath = [docSnap.data().path[0]];
                setPath(docSnap.data().path);
                const q = query(
                  folderRef,
                  where("id", "in", docSnap.data().path),
                  where("owner", "==", user),
                  orderBy("createdat")
                );

                getDocs(q)
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      if (doc.data().deleted == true) navigate("/trash");
                      tempPath = [
                        ...tempPath,
                        { id: doc.data().id, name: doc.data().name },
                      ];
                    });
                  })
                  .then((x) => {
                    setbreadcrumbPath(tempPath);
                  });

                setFolderID(docSnap.id);
                const folderQuery = query(
                  folderRef,
                  where("parent", "==", params.folderId),
                  where("owner", "==", user),
                  where("deleted", "==", false)
                );
                onSnapshot(folderQuery, (folderSnap) => {
                  var x = 0;

                  folderSnap.forEach((folders) => {
                    if (x == 0) setFolder([folders.data()]);
                    else
                      setFolder((prevfolder) => [
                        ...prevfolder,
                        folders.data(),
                      ]);
                    x++;
                  });
                  if (x == 0) {
                    setFolder([]);
                  }
                });
                const fileQuery = query(
                  collection(db, "Files"),
                  where("parent", "==", params.folderId),
                  where("owner", "==", user),
                  where("deleted", "==", false)
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
                throw new Error("Invalid URL");
              }
            },
            (error) => {
              console.log("Er", error);
              setError(error);
              throw error;
            }
          );
        } catch (error) {
          console.log("err", error);
        }
      } else {
        setbreadcrumbPath([{ name: "Search Results" }]);
        const folderQuery = query(
          folderRef,
          where("name", ">=", params.search),
          where("name", "<", params.search + "\uf8ff"),
          // where("name", "<=", "\uf8ff", params.search),
          where("owner", "==", user),
          where("deleted", "==", false)
        );
        onSnapshot(folderQuery, (folderSnap) => {
          var x = 0;

          folderSnap.forEach((folders) => {
            if (x == 0) setFolder([folders.data()]);
            else setFolder((prevfolder) => [...prevfolder, folders.data()]);
            x++;
          });
          if (x == 0) {
            setFolder([]);
          }
        });
        const fileQuery = query(
          collection(db, "Files"),
          where("parent", "==", params.search),
          where("owner", "==", user),
          where("deleted", "==", false)
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
      }
    }
  }, [location.pathname]);
  if (error) {
    console.log(error);
    throw error;
  }
  return (
    <div className="content-box ps-md-4 pt-md-3  p-1 pb-0 m-2 mt-0">
      <div className="py-2 px-2 px-md-0 me-md-4 d-flex justify-content-between">
        <h4>
          <Breadcrumb path={breadcrumbPath} />
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
