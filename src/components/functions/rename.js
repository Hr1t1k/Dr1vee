import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebasecofig";
export default async (id, newName, type) => {
  updateDoc(doc(db, type == 1 ? "Files" : "Folders", id), {
    name: newName,
  });
};
