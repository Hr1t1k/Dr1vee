import React, { useState } from "react";
import {
  collection,
  updateDoc,
  addDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import usePath from "../../context/PathContext";
import auth, { db } from "../../../firebasecofig";
import { useNavigate } from "react-router-dom";
function ModalNewfolder(props) {
  const [folderName, setFolderName] = useState("");
  const { path, folderID, setSize, myDriveId } = usePath();
  var uploadPath;
  const navigate = useNavigate();
  var uploadFolderId;
  if (path[0] && path[0].id == "my-drive") {
    uploadFolderId = folderID;
    uploadPath = path;
  } else {
    uploadPath = [{ id: "my-drive", name: "My drive" }];
    uploadFolderId = myDriveId;
  }
  return (
    <div
      className="modal fade"
      id="new-folder"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ zIndex: "2000" }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ width: "25%", minWidth: "350px" }}
      >
        <div className="modal-content">
          <div className="modal-body p-4">
            <h3 className="modal-title " id="exampleModalLabel">
              New folder
            </h3>
            <input
              type="text"
              value={folderName}
              onChange={(event) => setFolderName(event.target.value)}
              className="input p-2 my-3 border border-primary  "
              style={{ width: "98%" }}
            ></input>
            <div className="d-flex justify-content-end gap-4">
              <button type="button" className="btn " data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn text-primary"
                onClick={async () => {
                  const docRef = await addDoc(collection(db, "Folders"), {
                    name: folderName,

                    folders: [],
                    files: [],
                    owner: auth.currentUser.uid,
                    ownerName: auth.currentUser.displayName,
                    ownerPic: auth.currentUser.photoURL,
                    deleted: false,
                    createdat: new Date(),
                    lastModifiedDate: new Date(Date.now()).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    ),
                    shared: [],
                    visibility: false,
                    parent: uploadFolderId,
                  });
                  var currPath = [...uploadPath, docRef.id];
                  await updateDoc(doc(db, "Folders", docRef.id), {
                    path: currPath,
                    id: docRef.id,
                  });
                  await updateDoc(doc(db, "Folders", uploadFolderId), {
                    folders: arrayUnion(docRef.id),
                  });
                  setFolderName("");
                  if (path[0] && path[0].id != "my-drive")
                    navigate("/my-drive");
                }}
                data-bs-dismiss="modal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalNewfolder;
