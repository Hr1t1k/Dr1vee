import auth, { db } from "../firebasecofig";
import {
  writeBatch,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import ROOT_FOLDER from "./components/RootFolders";

import functions from "firebase-functions";
exports.newUserSignup = functions.auth.user().onCreate((user) => {
  const batch = writeBatch(db);
  for (const [key, value] of Object.entries(ROOT_FOLDER)) {
    batch.set(doc(collection(db, "Folders")), {
      files: [],
      folders: [],
      name: value.name,
      owner: user.uid,
      id: key,
      path: [key],
    });
  }
  batch.set(doc(db, "Folders", "deleted"), {
    folders: [],
    files: [],
  });
  batch.commit().then(() => console.log(new Date().getTime()));
  setDoc(doc(db, "users", user.uid), {
    id: user.uid,
  });
});
