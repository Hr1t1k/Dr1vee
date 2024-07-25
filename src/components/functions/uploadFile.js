import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
import { v4 } from "uuid";
import getFileType from "./getFileType";
const uploadFile = (file, fileId, parentId, path, setUploads) => {
  const fileName = file.name;
  const storage = getStorage();

  const filePath = fileId + "/" + file.name;
  const fileRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(fileRef, file);
  setUploads((prevUploads) => ({
    ...prevUploads,
    [fileId]: { task: uploadTask, status: "running", progress: 0 },
  }));
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      setUploads((prevUploads) => ({
        ...prevUploads,
        [fileId]: {
          name: file.name,
          progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          status: snapshot.state,
          task: uploadTask,
        },
      }));
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          console.log("user unauth");
          break;
        case "storage/canceled":
          setUploads((prevUploads) => ({
            ...prevUploads,
            [fileId]: {
              name: file.name,
              status: "Cancelled",
            },
          }));
          break;
        case "storage/unknown":
          console.log("unkown upload file error");
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        const date = new Date().now;
        const newId = v4();
        const docRef = await setDoc(doc(db, "Files", newId), {
          name: fileName,
          id: newId,
          filePath: filePath,
          owner: auth.currentUser.uid,
          ownerName: auth.currentUser.displayName,
          ownerPic: auth.currentUser.photoURL,
          shared: [],
          visibility: false,
          downloadURL: downloadURL,
          parent: parentId,
          path: path,
          type: getFileType(fileName).fileExtension,
          filesize: file.size,
          deleted: false,
          rootDeleted: false,
          starred: false,
          lastModifiedDate: new Date(Date.now()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        });
      });
      setUploads((prevUploads) => ({
        ...prevUploads,
        [fileId]: {
          name: file.name,
          progress: 100,
          status: "completed",
          task: uploadTask,
        },
      }));
    }
  );
};
export default uploadFile;
