import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebasecofig";

export default async (id, type) => {
  await deleteDoc(doc(db, type ? "Files" : "Folders", id));
};
