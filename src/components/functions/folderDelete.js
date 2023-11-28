import {
  doc,
  getDocs,
  updateDoc,
  query,
  collection,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../../firebasecofig";

const folderDelete = async (folder, folderID) => {
  const docRef = doc(db, "Folders", folder.id);
  const user = localStorage.getItem("uid");
  const q = query(
    collection(db, "Folders"),
    where("id", "==", "trash"),
    where("owner", "==", user)
  );

  const querySnapshot = getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach(async (d) => {
      console.log(d.id, d.data());
      updateDoc(docRef, {
        oldParent: folderID,
        parent: d.id,
      });
      const trashRef = doc(db, "Folders", d.id);

      updateDoc(trashRef, {
        folders: arrayUnion(folder.id),
      }).catch((error) => {
        console.log("error", error);
      });
      updateDoc(doc(db, "Folders", "deleted"), {
        folders: arrayUnion(folder.id),
      }).catch((error) => {
        console.log("error", error);
      });
      await updateDoc(doc(db, "Folders", folderID), {
        folders: arrayRemove(folder.id),
      }).catch((error) => {
        console.log("error", error);
      });
    });
  });
};
export { folderDelete };
