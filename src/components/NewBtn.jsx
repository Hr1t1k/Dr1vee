import React from "react";
export default () => {
  return (
    <div class="dropdown">
      <button
        type="button"
        role="button"
        className="NewBtn p-3 m-2 ms-0 mb-3 rounded-4 shadow-sm d-sm-inline-flex gap-2 d-none"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-disabled="false"
        aria-haspopup="true"
        data-bs-offset="-10,-60"
      >
        <svg
          class="Q6yead QJZfhe "
          width="24"
          height="24"
          viewBox="0 0 24 24"
          focusable="false"
        >
          <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
        </svg>
        <p className="p-0 mx-1">New</p>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item d-flex align-items-center gap-3" href="#">
            <svg
              class="a-s-fa-Ha-pa c-qd"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              focusable="false"
              fill="currentColor"
            >
              <path d="M12 12h2v-2h2v2h2v2h-2v2h-2v-2h-2v-2zm10-4v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2l.01-12c0-1.1.89-2 1.99-2h6l2 2h8c1.1 0 2 .9 2 2zm-2 0H4v10h16V8z"></path>
            </svg>{" "}
            New Folder
          </a>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li>
          <a class="dropdown-item d-flex align-items-center gap-3" href="#">
            <svg
              class="a-s-fa-Ha-pa c-qd"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              focusable="false"
              fill="currentColor"
            >
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
              <path d="M8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"></path>
            </svg>
            File Upload
          </a>
        </li>
        <li>
          <a class="dropdown-item d-flex align-items-center gap-3" href="#">
            <svg
              class="a-s-fa-Ha-pa c-qd"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              focusable="false"
              fill="currentColor"
            >
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z"></path>
            </svg>
            Folder Upload
          </a>
        </li>
      </ul>
    </div>
  );
};
