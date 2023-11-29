import React from "react";
import "./folder.css";
import MenuDots from "../MenuDots";
import { useNavigate, useParams } from "react-router-dom";
import RenameFolder from "./RenameFolder";
import auth from "../../../firebasecofig";
export default (props) => {
  const grid = props.grid;
  const folder = props.folder;
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <RenameFolder folder={folder} />
      <div
        onClick={() => navigate(`/folders/${folder.id}`)}
        className={`${
          grid ? "d-grid rounded-3 folder-box" : "list-header d-grid"
        }    align-items-center position-relative btn p-0 m-0 text-start`}
      >
        <div
          className="d-flex align-items-center overflow-hidden"
          style={{ height: "48px", width: "90%" }}
        >
          <svg
            height="24px"
            width="24px"
            focusable="false"
            viewBox="0 0 24 24"
            fill="#5f6368"
            className="m-3"
            style={{ flexShrink: 0 }}
          >
            <g>
              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </g>
          </svg>
          <p className=" p-0 m-0 text-truncate text-nowrap">{folder.name}</p>
        </div>
        {!grid && (
          <>
            <p className="d-none d-md-flex gap-1 text-truncate text-nowrap">
              <img
                src={folder.ownerPic}
                height="24px"
                width="24px"
                style={{ borderRadius: "50%" }} 
              />
              {folder.owner == auth.currentUser.uid ? "me" : folder.ownerName}
            </p>
            <p className="d-none d-sm-grid">{folder.lastModifiedDate}</p>
            <p className="d-none d-md-grid">-</p>
          </>
        )}
        <MenuDots folder={folder} />
      </div>

      {!grid && <hr className="m-0 p-0" />}
    </>
  );
};
