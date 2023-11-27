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
const uploadFolder = async (files, folderID, path) => {
  var folderPath = {};
  var file;
  for await (file of files) {
    const folders = file.webkitRelativePath.split("/");
    folders.pop();
    var parId = folderID;
    var currPath = path;
    var folderStringPath = "";
    for await (const [index, folder] of folders.entries()) {
      folderStringPath += "/" + folder;
      if (folderStringPath in folderPath) {
        parId = folderPath[folderStringPath];
      } else {
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
          await updateDoc(doc(db, "Folders", docRef.id), {
            id: docRef.id,
            path: currPath,
          });
          await updateDoc(doc(db, "Folders", parId), {
            folders: arrayUnion(docRef.id),
          });
          parId = docRef.id;
          folderPath[folderStringPath] = docRef.id;
          if (index == folders.length - 1) {
            uploadFile(file, uuidv4(), parId);
          }
        });
      }
    }
  }
};

export default uploadFolder;
