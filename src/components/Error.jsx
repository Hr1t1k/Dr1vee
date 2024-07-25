import React from "react";

const Error = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-wrap mt-5 gap-5 m-1"
      style={{ height: "50vh" }}
    >
      <div className="">
        <h1>Drive</h1>
        <p>
          <span className="fw-bold">404.</span> That’s an error.
        </p>
        <p className="my-3 fs-6">
          The requested URL was not found on this server. That’s <br></br>all we
          know.
        </p>
      </div>
      <img
        src="https://www.google.com/images/errors/robot.png"
        height="200px"
        width="200px"
      />
    </div>
  );
};

export default Error;
