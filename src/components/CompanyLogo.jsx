import React from "react";
import DriveSVG from "./DriveSVG";
import "../App.css";
export default () => {
  return (
    <div className="logo ms-md-3">
      <a
        href="/"
        className="d-flex align-items-center mb-0  link-body-emphasis text-decoration-none"
        aria-expanded="false"
      >
        <img
          className="gb_Kc gb_Kd"
          src="//ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png"
          srcSet="//ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png 2x ,//ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png 1x"
          alt=""
          aria-hidden="true"
          role="presentation"
          style={{ width: "40px", height: "40px" }}
        ></img>
        <h4
          className="p-2 d-none d-md-block pb-0"
          style={{ fontSize: "22px", color: "rgb(68, 71, 70)" }}
        >
          Drive
        </h4>
      </a>
    </div>
  );
};
