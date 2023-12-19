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
    files: arrayRemove(file.id),
  });
  batch.update(doc(db, "Files", file.id), {
    parent: file.oldParent,
    deleted: false,
  });
  batch.update(doc(db, "Folders", file.oldParent), {
    files: arrayUnion(file.id),
  });
  batch.commit();
};
