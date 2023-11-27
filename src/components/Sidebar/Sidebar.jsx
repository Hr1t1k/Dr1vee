import React from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./sidebar.css";
import CompanyLogo from "../Header/CompanyLogo";
import NewBtn from "./NewBtn";
export default () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="sidebar overflow-x-hidden">
        <div
          className="offcanvas-lg offcanvas-start p-lg-0 p-2 p-0 ps-md-3 ps-lg-3 "
          tabIndex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
          style={{ width: "245px" }}
        >
          <div className="offcanvas-header">
            <CompanyLogo />
            <button
              type="button"
              className="btn-close d-none "
              data-bs-dismiss="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-label="Close"
            ></button>
          </div>
          <NewBtn />
          <div className="offcanvas-body p-0 overflow-y-auto">
            <nav className=" nav flex-column" style={{ width: "218px" }}>
              <NavLink
                key={1}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "d-inline-flex",
                    "align-items-center",
                    "gap-3",
                    "rounded-4",
                    "w-100",
                    isActive ? "active" : "inactive",
                    isPending ? "pending" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/my-drive"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/my-drive");
                }}
                data-bs-target="#sidebarMenu"
                data-bs-dismiss="offcanvas"
              >
                <svg
                  className="a-s-fa-Ha-pa c-qd"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  focusable="false"
                >
                  <path d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"></path>
                  <path d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"></path>
                </svg>
                <p className="sidebarItems"> My Drive</p>
              </NavLink>
              <NavLink
                key={2}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "d-inline-flex",
                    "align-items-center",
                    "gap-3",
                    "rounded-4",
                    "w-100",
                    isActive ? "active" : "inactive",
                    isPending ? "pending" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/shared-drives"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/shared-drives");
                }}
                data-bs-target="#sidebarMenu"
                data-bs-dismiss="offcanvas"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  focusable="false"
                  className=" c-qd"
                >
                  <g>
                    <rect fill="none" height="24" width="24"></rect>
                  </g>
                  <g>
                    <g>
                      <path d="M19,2H5C3.9,2,3,2.9,3,4v13h18V4C21,2.9,20.1,2,19,2z M9.5,7C10.33,7,11,7.67,11,8.5c0,0.83-0.67,1.5-1.5,1.5 S8,9.33,8,8.5C8,7.67,8.67,7,9.5,7z M13,14H6v-1.35C6,11.55,8.34,11,9.5,11s3.5,0.55,3.5,1.65V14z M14.5,7C15.33,7,16,7.67,16,8.5 c0,0.83-0.67,1.5-1.5,1.5S13,9.33,13,8.5C13,7.67,13.67,7,14.5,7z M18,14h-4v-1.35c0-0.62-0.3-1.12-0.75-1.5 c0.46-0.1,0.9-0.15,1.25-0.15c1.16,0,3.5,0.55,3.5,1.65V14z"></path>
                      <path d="M3,20c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-2H3V20z M18,19c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S17.45,19,18,19z"></path>
                    </g>
                  </g>
                </svg>
                <p className="sidebarItems">Shared drives</p>
              </NavLink>
              <NavLink
                key={3}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "d-inline-flex",
                    "align-items-center",
                    "gap-3",
                    "rounded-4",
                    "w-100",
                    "mb-3",
                    isActive ? "active" : "inactive",
                    isPending ? "pending" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/computers"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/computers");
                }}
                data-bs-target="#sidebarMenu"
                data-bs-dismiss="offcanvas"
              >
                <svg
                  className=" c-qd"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  focusable="false"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path>
                </svg>
                <p className="sidebarItems">Computers</p>
              </NavLink>
              <NavLink
                key={4}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "d-inline-flex",
                    "align-items-center",
                    "gap-3",
                    "rounded-4",
                    "w-100",

                    isActive ? "active" : "inactive",
                    isPending ? "pending" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/shared-with-me"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/shared-with-me");
                }}
                data-bs-target="#sidebarMenu"
                data-bs-dismiss="offcanvas"
              >
                <svg
                  className=" c-qd"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  focusable="false"
                >
                  <g>
                    <rect fill="none" height="24" width="24"></rect>
                  </g>
                  <g>
                    <g>
                      <path d="M15,8c0-1.42-0.5-2.73-1.33-3.76C14.09,4.1,14.53,4,15,4c2.21,0,4,1.79,4,4s-1.79,4-4,4c-0.43,0-0.84-0.09-1.23-0.21 c-0.03-0.01-0.06-0.02-0.1-0.03C14.5,10.73,15,9.42,15,8z M16.66,13.13C18.03,14.06,19,15.32,19,17v3h4v-3 C23,14.82,19.42,13.53,16.66,13.13z M9,4c2.21,0,4,1.79,4,4s-1.79,4-4,4s-4-1.79-4-4S6.79,4,9,4z M9,13c2.67,0,8,1.34,8,4v3H1v-3 C1,14.34,6.33,13,9,13z"></path>
                    </g>
                  </g>
                </svg>
                <p className="sidebarItems">Shared with me</p>
              </NavLink>
              <NavLink
                key={5}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "d-inline-flex",
                    "align-items-center",
                    "gap-3",
                    "rounded-4",
                    "w-100",
                    isActive ? "active" : "inactive",
                    isPending ? "pending" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/recent"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/recent");
                }}
                data-bs-target="#sidebarMenu"
                data-bs-dismiss="offcanvas"
              >
                <svg
                  className="c-qd "
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  focusable="false"
                >
                  <g>
                    <rect fill="none" height="24" width="24"></rect>
                  </g>
                  <g>
                    <path d="M11.99,2C6.47,2,2,6.48,2,12s4.47,10,9.99,10C17.52,22,22,17.52,22,12S17.52,2,11.99,2z M15.29,16.71L11,12.41V7h2v4.59l3.71,3.71L15.29,16.71z"></path>
                  </g>
                </svg>
                <p className="sidebarItems">Recent</p>
              </NavLink>
              <NavLink
                key={6}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "d-inline-flex",
                    "align-items-center",
                    "gap-3",
                    "rounded-4",
                    "w-100",
                    "mb-3",
                    isActive ? "active" : "inactive",
                    isPending ? "pending" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/starred"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/starred");
                }}
                data-bs-target="#sidebarMenu"
                data-bs-dismiss="offcanvas"
              >
                <svg
                  className=" c-qd"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  focusable="false"
                  fill="currentColor"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
                <p className="sidebarItems">Starred</p>
              </NavLink>
              <NavLink
                key={7}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "d-inline-flex",
                    "align-items-center",
                    "gap-3",
                    "rounded-4",
                    "w-100",
                    isActive ? "active" : "inactive",
                    isPending ? "pending" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/spam"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/spam");
                }}
                data-bs-target="#sidebarMenu"
                data-bs-dismiss="offcanvas"
              >
                <svg
                  className="c-qd "
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  focusable="false"
                >
                  <g>
                    <rect fill="none" height="24" width="24"></rect>
                  </g>
                  <g>
                    <path d="M15.73,3H8.27L3,8.27v7.46L8.27,21h7.46L21,15.73V8.27L15.73,3z M12,17c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1 S12.55,17,12,17z M13,13h-2V7h2V13z"></path>
                  </g>
                </svg>
                <p className="sidebarItems">Spam</p>
              </NavLink>
              <NavLink
                key={8}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "d-inline-flex",
                    "align-items-center",
                    "gap-3",
                    "rounded-4",
                    "w-100",
                    isActive ? "active" : "inactive",
                    isPending ? "pending" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/trash"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/trash");
                }}
                data-bs-target="#sidebarMenu"
                data-bs-dismiss="offcanvas"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  focusable="false"
                  className=" c-qd"
                >
                  <g>
                    <path d="M0,0h24v24H0V0z" fill="none"></path>
                  </g>
                  <g>
                    <path d="M15,4V3H9v1H4v2h1v13c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V6h1V4H15z M11,17H9V8h2V17z M15,17h-2V8h2V17z"></path>
                  </g>
                </svg>
                <p className="sidebarItems">Trash</p>
              </NavLink>
              <NavLink
                key={9}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "d-inline-flex",
                    "align-items-center",
                    "gap-3",
                    "rounded-4",
                    "w-100",
                    isActive ? "active" : "inactive",
                    isPending ? "pending" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/storage"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/storage");
                }}
                data-bs-target="#sidebarMenu"
                data-bs-dismiss="offcanvas"
              >
                <svg
                  className="a-s-fa-Ha-pa c-qd a-ml-da-Q-c"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  focusable="false"
                  fill="#6f6f6f"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path>
                </svg>
                <p className="sidebarItems">Storage</p>
              </NavLink>
              <div className="m-2">
                <div
                  className="progress my-1"
                  role="progressbar"
                  aria-label="Example 20px high"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: "4px" }}
                >
                  <div className="progress-bar" style={{ width: "25%" }}></div>
                </div>
                <p className="sidebarItems">x GB of y GB used</p>
              </div>
              <a>
                <button
                  type="button"
                  className="btn btn-outline-dark ms-2 px-4 rounded-5 mt-2 storageBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/my-drive");
                  }}
                  data-bs-target="#sidebarMenu"
                  data-bs-dismiss="offcanvas"
                >
                  <p>Get more storage</p>
                </button>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
