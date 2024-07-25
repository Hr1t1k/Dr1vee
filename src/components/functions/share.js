import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebasecofig";
export default (id, type, share) => {
  updateDoc(doc(db, type === 0 ? "Folders" : "Files", id), {
    sharedWith: share,
  });
};
