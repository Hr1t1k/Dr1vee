if (params.name) {
  if (params.name in ROOT_FOLDER) {
    try {
      const docRef = query(
        folderRef,
        where("id", "==", params.name),
        where("owner", "==", user)
      );
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        var tempPath = [];
        docSnap.forEach(
          (doc) => {
            if (params.name == "my-drive" && myDriveId == null)
              setMyDriveId(doc.id);
            setPath(doc.data().path);
            tempPath = [doc.data().path[0]];
            q = query(
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

            fileQuery = query(
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
          },
          (error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("Invalid URLs");
  }
} else if (params.folderId) {
  const docRef = doc(db, "Folders", params.folderId);
  var tempPath = [];
  const unsub = onSnapshot(docRef, (docSnap) => {
    // try {
    var cnt = 0;
    if (docSnap.exists()) {
      // if (docSnap.data().deleted && docSnap.data().deleted == true)
      //   navigate("/trash");
      cnt++;
      tempPath = [docSnap.data().path[0]];
      setPath(docSnap.data().path);
      q = query(
        folderRef,
        where("id", "in", docSnap.data().path),
        where("owner", "==", user),
        orderBy("createdat")
      );
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
  });
} else {
  setbreadcrumbPath([{ name: "Search Results" }]);
  const folderQuery = query(folderRef);
}
