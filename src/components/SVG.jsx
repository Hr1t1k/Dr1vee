import React from "react";

const SVG = (props) => {
  return (
    <svg
      className="a-s-fa-Ha-pa c-qd"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      focusable="false"
      fill="currentColor"
    >
      {props.path.map((path, index) => {
        return <path d={path} key={index}></path>;
      })}
    </svg>
  );
};

export default SVG;
