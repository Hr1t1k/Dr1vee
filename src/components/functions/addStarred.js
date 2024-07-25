import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebasecofig";
export default (id, type, starred) => {
  updateDoc(doc(db, type === 0 ? "Folders" : "Files", id), {
    starred: !starred,
  });
};
