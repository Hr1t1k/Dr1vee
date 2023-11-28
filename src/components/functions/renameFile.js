import {
  doc,
  getDocs,
  updateDoc,
  query,
  collection,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
import React from "react";

const renameFile = async (file, newName) => {
  updateDoc(doc(db, "Files", file.id), {
    name: newName,
  });
};

export default renameFile;
