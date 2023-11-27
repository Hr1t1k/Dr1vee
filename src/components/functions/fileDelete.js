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
      });
      const trashRef = doc(db, "Folders", d.id);

      updateDoc(trashRef, {
        files: arrayUnion({ id: file.id, name: file.name }),
      }).catch((error) => {
        console.log("error", error);
      });
      updateDoc(doc(db, "Folders", "deleted"), {
        files: arrayUnion(file.id),
      }).catch((error) => {
        console.log("error", error);
      });

      const objToRemove = {
        id: file.id,
        name: file.name,
      };

      await updateDoc(doc(db, "Folders", folderID), {
        files: arrayRemove(objToRemove),
      }).catch((error) => {
        console.log("error", error);
      });
    });
  });
};
export { fileDelete };
