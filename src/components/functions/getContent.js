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
import ROOT_FOLDER from "../RootFolders";

export default () => {
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
                    setFolder((prevfolder) => [...prevfolder, folders.data()]);
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
    }
  }
};
