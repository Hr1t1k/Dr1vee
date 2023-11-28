import React from "react";
import {
  collection,
  updateDoc,
  addDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
const createFolder = async (input, folderName, setFolderName) => {
  const path = input.path;
  const folderID = input.folderID;
  const docRef = await addDoc(collection(db, "Folders"), {
    name: folderName,

    folders: [],
    files: [],
    owner: auth.currentUser.uid,
    shared: [],
    visibility: false,
    parent: folderID,
  });
  var currPath = [...path, docRef.id];
  await updateDoc(doc(db, "Folders", docRef.id), {
    path: currPath,
    id: docRef.id,
  });
  await updateDoc(doc(db, "Folders", folderID), {
    folders: arrayUnion(docRef.id),
  });
  setFolderName("");
};

export default createFolder;
