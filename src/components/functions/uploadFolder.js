import { v4 as uuidv4 } from "uuid";
import {
  collection,
  updateDoc,
  addDoc,
  doc,
  arrayUnion,
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
        parId = folderPath[folderStringPath].id;
        currPath = folderPath[folderStringPath].path;
      } else {
        await addDoc(collection(db, "Folders"), {
          name: folder,
          folders: [],
          files: [],
          owner: auth.currentUser.uid,
          ownerName: auth.currentUser.displayName,
          ownerPic: auth.currentUser.photoURL,
          createdat: new Date(),
          deleted: false,
          lastModifiedDate: new Date(Date.now()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          shared: [],
          visibility: false,
          parent: parId,
        }).then(async (docRef) => {
          currPath = [...currPath, docRef.id];
          await updateDoc(doc(db, "Folders", docRef.id), {
            id: docRef.id,
            path: currPath,
          });
          await updateDoc(doc(db, "Folders", parId), {
            folders: arrayUnion(docRef.id),
          });
          parId = docRef.id;
          folderPath[folderStringPath] = { id: docRef.id, path: currPath };
          if (index == folders.length - 1) {
            uploadFile(file, uuidv4(), parId, path);
          }
        });
      }
    }
  }
  folderPath = {};
};

export default uploadFolder;
