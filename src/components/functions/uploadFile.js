import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
  uploadString,
  getStorage,
} from "firebase/storage";
import {
  collection,
  updateDoc,
  addDoc,
  doc,
  arrayUnion,
  FieldPath,
  arrayRemove,
} from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";

const uploadFile = (file, fileId, parentId) => {
  const fileName = file.name;
  const storage = getStorage();

  const filePath = localStorage.getItem("uid") + "/" + fileId + "/" + file.name;
  const fileRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(fileRef, file);
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
          path: filePath,
          owner: auth.currentUser.uid,
          shared: [],
          visibility: false,
          downloadURL: downloadURL,
          parent: parentId,
        });
        updateDoc(doc(db, "Files", docRef.id), {
          id: docRef.id,
        });
        await updateDoc(doc(db, "Folders", parentId), {
          files: arrayUnion({
            id: docRef.id,
          }),
        });
      });
    }
  );
};
export default uploadFile;
