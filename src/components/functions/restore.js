import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebasecofig";
export default async (id, type, file, myDriveId) => {
  const parentDoc = await getDoc(doc(db, "Folders", file.parent));
  if (parentDoc.exists() && parentDoc.data().deleted) {
    updateDoc(doc(db, type == 1 ? "Files" : "Folders", id), {
      deleted: false,
      rootDeleted: false,
      parent: myDriveId,
      path: [file.path[0], { id: id, name: file.name }],
    });
  } else {
    updateDoc(doc(db, type == 1 ? "Files" : "Folders", id), {
      deleted: false,
      rootDeleted: false,
    });
  }
};
