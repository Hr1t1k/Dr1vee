import { v4 as uuidv4 } from "uuid";
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

import uploadFile from "./uploadFile";
const u = async (
  folders,
  idx,
  folderPath,
  currFolderPath,
  parId,
  fileId,
  files,
  ind,
  currPath,
  folderID,
  path
) => {
  currFolderPath = currFolderPath + "/" + folders[idx];
  if (currFolderPath in folderPath) {
    currPath = folderPath[currFolderPath].path;
    parId = folderPath[currFolderPath].id;
    if (idx == folders.length - 2) {
      uploadFile(files[ind], fileId, parId);
      if (ind < files.length - 1) uf(files, ind + 1, folderPath);
      return;
    }
    if (idx < folders.length - 1)
      u(
        folders,
        idx + 1,
        folderPath,
        currFolderPath,
        parId,
        fileId,
        files,
        ind,
        currPath,
        path,
        folderID
      );
  } else {
    const docRef = await addDoc(collection(db, "Folders"), {
      name: folders[idx],
      folders: [],
      files: [],
      owner: auth.currentUser.uid,
      shared: [],
      visibility: false,
      parent: parId,
    }).then(async (docRef) => {
      var currPath = [...path, { id: docRef.id, name: folders[idx] }];
      folderPath[currFolderPath] = { id: docRef.id, path: currPath };
      await updateDoc(doc(db, "Folders", docRef.id), {
        path: currPath,
        id: docRef.id,
      });
      await updateDoc(doc(db, "Folders", parId), {
        folders: arrayUnion({ id: docRef.id, name: folders[idx] }),
      });
      if (idx == folders.length - 2) {
        uploadFile(files[ind], fileId, docRef.id);
        if (ind < files.length - 1)
          uf(files, ind + 1, folderPath, folderID, path);
        return;
      }
      parId = docRef.id;
      if (idx < folders.length - 1)
        u(
          folders,
          idx + 1,
          folderPath,
          currFolderPath,
          parId,
          fileId,
          files,
          ind,
          currPath,
          folderID,
          path
        );
    });
  }
};
// const uf = async (files, ind, folderPath, folderID, path) => {
//   const fileId = uuidv4();
//   var currFolderPath = "";
//   var parId = folderID;
//   console.log(ind, files[ind]);
//   const filePath = files[ind].webkitRelativePath;
//   const newFolders = filePath.split("/");
//   var currPath = path;
//   u(
//     newFolders,
//     0,
//     folderPath,
//     currFolderPath,
//     parId,
//     fileId,
//     files,
//     ind,
//     currPath,
//     folderID,
//     path
//   );
// };
const upFile = async (file, folderPath, path, folderID) => {
  const fileId = uuidv4();
  var currFolderPath = "";
  var parId = folderID;
  const filePath = file.webkitRelativePath;
  const newFolders = filePath.split("/");
  var currPath = path;
  for (const [index, folder] of newFolders.entries()) {
    currFolderPath = currFolderPath + "/" + folder;
    if (currFolderPath in folderPath) {
      currPath = folderPath[currFolderPath].path;
      parId = folderPath[currFolderPath].id;
      if (index == newFolders.length - 2) {
        uploadFile(file, fileId, parId);
        return;
      }
    } else {
      const docRef = await addDoc(collection(db, "Folders"), {
        name: folder,
        folders: [],
        files: [],
        owner: auth.currentUser.uid,
        shared: [],
        visibility: false,
        parent: parId,
      }).then(async (docRef) => {
        var currPath = [...path, { id: docRef.id, name: folder }];
        folderPath[currFolderPath] = { id: docRef.id, path: currPath };
        await updateDoc(doc(db, "Folders", docRef.id), {
          path: currPath,
          id: docRef.id,
        });
        await updateDoc(doc(db, "Folders", parId), {
          folders: arrayUnion({ id: docRef.id, name: folder }),
        });
        if (index == newFolders.length - 2) {
          uploadFile(file, fileId, docRef.id);
          return;
        }
        parId = docRef.id;
      });
    }
  }
};
const uploadFolder = async (files, folderID, path) => {
  var folderPath = {};
  var file;
  for (file of files) {
    const folders = file.webkitRelativePath.split("/");
    folders.pop();
    var parId = folderID;
    var currPath = path;
    var folderStringPath = "";
    for (const [index, folder] of folders.entries()) {
      console.log("check", index, folder);
      folderStringPath += "/" + folder;
      await addDoc(collection(db, "Folders"), {
        name: folder,
        folders: [],
        files: [],
        owner: auth.currentUser.uid,
        shared: [],
        visibility: false,
        parent: parId,
      }).then(async (docRef) => {
        currPath = [...currPath, { id: docRef.id, name: folder }];
        updateDoc(doc(db, "Folders", docRef.id), {
          id: docRef.id,
          path: currPath,
        });
        updateDoc(doc(db, "Folders", parId), {
          folders: arrayUnion(docRef.id),
        });
        parId = docRef.id;
        folderPath.folderStringPath = docRef.id;
        if (index == folders.length - 1) {
          uploadFile(file, uuidv4(), parId);
        }
      });
    }
  }
  //uf(files, 0, folderPath, folderID, path);
};

export default uploadFolder;
