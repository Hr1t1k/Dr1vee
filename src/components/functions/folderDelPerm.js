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
  updateDoc(doc(db, "Folders", file.oldParent), {
    folders: arrayRemove(file.id),
  });

  const q = query(
    collection(db, "Folders"),
    where("path", "array-contains-any", [file.id])
  );
  getDocs(q).then((querySnapshot) => {
    const batch = writeBatch(db);
    querySnapshot.forEach((docSnap) => {
      batch.delete(doc(db, "Folders", docSnap.data().id));
    });
    batch.commit();
  });
  const fileq = query(
    collection(db, "Files"),
    where("path", "array-contains-any", [file.id])
  );
  getDocs(fileq).then((querySnapshot) => {
    const batch = writeBatch(db);
    querySnapshot.forEach((docSnap) => {
      deleteObject(ref(storage, docSnap.data().filePath));
      batch.delete(doc(db, "Files", docSnap.data().id));
    });
    batch.commit();
  });
};
