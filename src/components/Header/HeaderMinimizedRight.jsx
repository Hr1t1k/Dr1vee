import React from "react";
export default () => {
  return (
    <ul className="navbar-nav flex-row d-lg-none">
      {/* <li className="nav-item text-nowrap">
        <button
          className="nav-link px-3 text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSearch"
          aria-controls="navbarSearch"
          aria-expanded="false"
          aria-label="Toggle search"
        >
          Search
        </button>
      </li> */}
      <li className="nav-item text-nowrap">
        <button
          className="nav-link ps-3 text-white"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            className="a-s-fa-Ha-pa c-qd"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="black"
          >
            <g>
              <rect fill="none" width="24" height="24"></rect>
              <path d="M3,18h18v-2H3V18z M3,13h18v-2H3V13z M3,6v2h18V6H3z"></path>
            </g>
          </svg>
        </button>
      </li>
    </ul>
  );
};
