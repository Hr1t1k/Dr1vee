import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../../firebasecofig";
import { deleteObject, ref } from "firebase/storage";

export default (file, setSize) => {
  setSize((size) => size - file.filesize);
  deleteObject(ref(storage, file.filePath));
  deleteDoc(doc(db, "Files", file.id));
};
