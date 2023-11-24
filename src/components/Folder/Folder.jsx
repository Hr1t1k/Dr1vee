import React from "react";
import "./folder.css";
import MenuDots from "../MenuDots";
import { useNavigate } from "react-router-dom";
export default (props) => {
  const grid = props.grid;
  const navigate = useNavigate();
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
        <MenuDots />
      </div>
      {!grid && <hr className="m-0 p-0" />}
    </>
  );
};
