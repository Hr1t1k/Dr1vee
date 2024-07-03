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

const renameFile = async (folder, newName) => {
  console.log(newName, folder.id);
  updateDoc(doc(db, "Folders", folder.id), {
    name: newName,
  });
};

export default renameFile;
