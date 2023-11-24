import React, { useRef, useState } from "react";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
  uploadString,
  getStorage,
} from "firebase/storage";
// import { storage } from "../../../firebasecofig";
import {
  collection,
  updateDoc,
  addDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
import ModalNewfolder from "./ModalNewfolder";
import SVG from "../SVG";
import usePath from "../../context/PathContext";
import UploadFolder from "../Upload folder";

const uploadFile = (event) => {
  const inputFile = useRef(null);
  const inputFolder = useRef(null);
  const storage = getStorage();
  const storageRef = ref(storage);

  const myDriveRef = ref(storage, "My Drive");
  const { path, folderID } = usePath();
  const fileName = event.target.files[0].name;
  const fileRef = ref(
    storage,
    localStorage.getItem("uid") + "/" + path + "/" + event.target.files[0].name
  );
  const uploadTask = uploadBytesResumable(fileRef, event.target.files[0]);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("user unauth");
          break;
        case "storage/canceled":
          // User canceled the upload
          console.log("upload file cancelled");
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          console.log("unkown upload file error");
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        const docRef = await addDoc(collection(db, "Files"), {
          name: fileName,
          path: localStorage.getItem("uid") + "/" + path + "/" + fileName,
          owner: auth.currentUser.uid,
          shared: [],
          visibility: false,
          downloadURL: downloadURL,
        });

        await updateDoc(doc(db, "Folders", folderID), {
          files: arrayUnion({
            id: docRef.id,
            name: fileName,
            downloadURL: downloadURL,
          }),
        });
      });
    }
  );
};
export { uploadFile };
