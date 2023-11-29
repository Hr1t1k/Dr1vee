import {
  doc,
  getDocs,
  updateDoc,
  query,
  collection,
  where,
  arrayUnion,
  arrayRemove,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../firebasecofig";
import React from "react";

export default (file) => {
  const batch = writeBatch(db);
  batch.update(doc(db, "Folders", file.parent), {
    folders: arrayRemove(file.id),
  });
  batch.update(doc(db, "Folders", file.id), { parent: file.oldParent });
  batch.update(doc(db, "Folders", file.oldParent), {
    folders: arrayUnion(file.id),
  });
  batch.commit();
};
