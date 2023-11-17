import React from "react";
export default () => {
  return (
    <>
      <div
        className="btn position-absolute d-flex align-items-center three-dots end-0 me-2 p-1 "
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-three-dots-vertical "
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </div>

      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#">
            Download
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Rename
          </a>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>

        <li>
          <a class="dropdown-item" href="#">
            Share
          </a>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>

        <li>
          <a class="dropdown-item" href="#">
            Move to trash
          </a>
        </li>
      </ul>
    </>
  );
};
