import { doc, FieldPath, updateDoc } from "firebase/firestore";
import { db } from "../../../firebasecofig";

export default async (id, type) => {
  console.log(id, type);
  const docRef = doc(db, type == 1 ? "Files" : "Folders", id);

  updateDoc(docRef, {
    deleted: true,
    rootDeleted: true,
  });
};
