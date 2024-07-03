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

const fileDelete = async (file, folderID) => {
  console.log(file, folderID);
  const docRef = doc(db, "Files", file.id);
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
        deleted: true,
      });
      const trashRef = doc(db, "Folders", d.id);

      updateDoc(trashRef, {
        files: arrayUnion(file.id),
      }).catch((error) => {
        console.log("error", error);
      });
      await updateDoc(doc(db, "Folders", folderID), {
        files: arrayRemove(file.id),
      }).catch((error) => {
        console.log("error", error);
      });
    });
  });
};
export { fileDelete };
