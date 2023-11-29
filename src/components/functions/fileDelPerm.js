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
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebasecofig";
import React from "react";
import { deleteObject, ref } from "firebase/storage";

export default (file) => {
  updateDoc(doc(db, "Folders", file.parent), {
    files: arrayRemove(file.id),
  });
  getDoc(doc(db, "Files", file.id)).then((docSnap) => {
    deleteObject(ref(storage, docSnap.data().filePath));
    deleteDoc(doc(db, "Files", file.id));
  });
};
