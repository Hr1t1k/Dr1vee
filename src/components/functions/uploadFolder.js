import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, writeBatch } from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
import getFileType from "./getFileType";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

var uploadTasks = [];
var folderId;
var progressValues = {};
const uploadFiles = (file, fileId, parentId, path, length) => {
  let totalProgress = 0;
  const fileName = file.name;
  const storage = getStorage();

  const filePath = fileId + "/" + file.name;
  const fileRef = ref(storage, filePath);

  const uploadTask = uploadBytesResumable(fileRef, file);

  uploadTasks.push(uploadTask);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressValues[fileId] = progress;
      totalProgress =
        Object.values(progressValues).reduce((acc, curr) => acc + curr, 0) /
        length;
      onProgress(totalProgress, snapshot.state);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        const date = new Date().now;
        const newId = uuidv4();
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
          filesize: file.size,
          deleted: false,
          rootDeleted: false,
          starred: false,
          type: getFileType(fileName).fileExtension,
          lastModifiedDate: new Date(Date.now()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        });
      });
      // onComplete();
    }
  );
};

const pause = () => {
  uploadTasks.forEach((task) => task.pause());
  setUploads((prevUploads) => {
    // Create a copy of the previous uploads object to avoid mutation
    const updatedUploads = { ...prevUploads };
    updatedUploads[folderId] = {
      ...updatedUploads[folderId], // Preserve existing properties

      status: "paused",
    };

    return updatedUploads;
  });
};

const resume = () => {
  uploadTasks.forEach((task) => task.resume());
  setUploads((prevUploads) => {
    // Create a copy of the previous uploads object to avoid mutation
    const updatedUploads = { ...prevUploads };
    updatedUploads[folderId] = {
      ...updatedUploads[folderId], // Preserve existing properties

      status: "running",
    };

    return updatedUploads;
  });
};
var setUploads;
const cancel = () => {
  uploadTasks.forEach((task) => task.cancel());
  setUploads((prevUploads) => {
    const updatedUploads = { ...prevUploads };
    updatedUploads[folderId] = {
      ...updatedUploads[folderId],
      status: "cancelled",
    };

    return updatedUploads;
  });
};
const onProgress = (value, status) => {
  setUploads((prevUploads) => {
    const updatedUploads = { ...prevUploads };
    updatedUploads[folderId] = {
      ...updatedUploads[folderId], // Preserve existing properties
      progress: value,
      status: status,
    };

    return updatedUploads;
  });
};
var task = { pause, resume, cancel };
const uploadFolder = async (files, folderID, path, setUpload) => {
  task = { pause, resume, cancel };
  uploadTasks = [];
  progressValues = {};
  folderId = uuidv4();
  setUploads = setUpload;
  var folderPath = {};
  const batch = writeBatch(db);
  var folderName;
  for (const file of files) {
    var folders = file.webkitRelativePath.split("/");
    folderName = folders[0];
    folders.pop();
    var parId = folderID;
    var currPath = path;
    var folderStringPath = "";
    for (const [index, folder] of folders.entries()) {
      folderStringPath += "/" + folder;
      if (folderStringPath in folderPath) {
        parId = folderPath[folderStringPath].id;
        currPath = folderPath[folderStringPath].path;
      } else {
        const newFolderId = uuidv4();
        currPath = [...currPath, { id: newFolderId, name: folder }];
        batch.set(doc(db, "Folders", newFolderId), {
          name: folder,
          starred: false,
          owner: auth.currentUser.uid,
          ownerName: auth.currentUser.displayName,
          ownerPic: auth.currentUser.photoURL,
          createdat: new Date(),
          deleted: false,
          rootDeleted: false,
          lastModifiedDate: new Date(Date.now()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          shared: [],
          visibility: false,
          parent: parId,
          id: newFolderId,
          path: currPath,
        });
        parId = newFolderId;
        folderPath[folderStringPath] = { id: newFolderId, path: currPath };
      }
      if (index == folders.length - 1) {
        uploadFiles(file, uuidv4(), parId, path, files.length);
      }
    }
  }
  await batch.commit();
  setUploads((prevUploads) => ({
    ...prevUploads,
    [folderId]: {
      name: folderName,
      progress: 0,
      task: task,
      status: "running",
    },
  }));
  folderPath = {};
};

export default uploadFolder;
