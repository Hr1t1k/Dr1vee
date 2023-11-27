import React from "react";
export default (props) => {
  return (
    <div className="no-content d-flex flex-column align-items-center justify-content-center ">
      <div className="w-100  text-center">
        <img
          className="p-3"
          width={"30%"}
          style={{ maxWidth: "200px" }}
          role="presentation"
          src={props.src}
        ></img>
        <h3>{props.header}</h3>
        <p>{props.para}</p>
      </div>
    </div>
  );
};
