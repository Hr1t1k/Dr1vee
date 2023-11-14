import React from "react";
export default () => {
  return (
    <>
      <form
        className="d-flex  align-items-center w-100 h-5 m-2 ps-1 pe-4 input-group input-group-lg "
        style={{
          borderRadius: "70px",
          border: "0px solid red",
          maxWidth: "680px",
          backgroundColor: "rgb(237, 242, 252)",
        }}
        role="search"
      >
        <button type="button" className="btn" style={{ borderRadius: "50%" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="20"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 20"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
        <input
          type="text"
          className="form-control"
          style={{
            backgroundColor: "transparent",
            border: "0px",
            fontSize: "16px",
            paddingLeft: "0px",
          }}
          placeholder="Search in Drive"
          aria-label="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      </form>
    </>
  );
};
