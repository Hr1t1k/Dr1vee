import React from "react";
import "./folder.css";
import MenuDots from "../MenuDots";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  collection,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
export default (props) => {
  const grid = props.grid;
  const params = useParams();
  const navigate = useNavigate();
  const folderDelete = async () => {
    console.log("called");
    const docRef = doc(db, "Folders", props.id);
    //const docSnap = await getDoc(docRef);
    const user = localStorage.getItem("uid");

    const q = query(
      collection(db, "Folders"),
      where("id", "==", "trash"),
      where("owner", "==", user)
    );
    const querySnapshot = getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach(async (d) => {
        const trashRef = doc(db, "Folders", d.id);
        updateDoc(trashRef, {
          folders: arrayUnion({ id: props.id, name: props.folderName }),
        });
        updateDoc(doc(db, "Folders", "deleted"), {
          folders: arrayUnion(props.id),
        });
        console.log(
          "folder to delete",
          {
            id: props.id,
            name: props.folderName,
          },
          params.folderId
        );
        const objToRemove = {
          id: props.id,
          name: props.folderName,
        };

        await updateDoc(doc(db, "Folders", params.folderId), {
          folders: arrayRemove(objToRemove),
        })
          .then((x) => {
            console.log("deleted", x);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log("folder0 to delete", props.id, props.folderName);
      });
    });
  };
  return (
    <>
      <div
        onClick={() => {
          navigate(`/folders/${props.id}`);
        }}
        className={`${
          grid ? "d-flex rounded-3 folder-box" : "list-header d-grid"
        }    align-items-center position-relative btn p-0 m-0 text-start`}
      >
        <div className="d-flex align-items-center" style={{ height: "48px" }}>
          <svg
            height="24px"
            width="24px"
            focusable="false"
            viewBox="0 0 24 24"
            fill="#5f6368"
            className="m-3"
          >
            <g>
              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </g>
          </svg>
          <p className=" p-0 m-0">{props.folderName}</p>
        </div>
        {!grid && (
          <>
            <p className="d-none d-md-grid">me</p>
            <p className="d-none d-sm-grid">xx/xx/xxxx</p>
            <p className="d-none d-md-grid">-</p>
          </>
        )}
        <MenuDots onClick={folderDelete} />
      </div>
      {!grid && <hr className="m-0 p-0" />}
    </>
  );
};
