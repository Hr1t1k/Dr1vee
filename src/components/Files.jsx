import React from "react";
import MenuDots from "./MenuDots";
export default () => {
  return (
    <>
      <div className="file-box p-0 m-0">
        <div className="file-content rounded-3 p-2">
          <div className="file-header d-flex align-items-center w-100 pb-2">
            <img
              className=" m-3 p-0 "
              width={20}
              src="https://drive-thirdparty.googleusercontent.com/32/type/image/jpeg"
              alt="Image"
              height={20}
            ></img>
            <p className="p-0 m-0">File 1</p>
            <MenuDots />
          </div>
          <div className="file-body rounded-2 d-flex align-items-center justify-content-center">
            <img
              jsaction=""
              className=" p-4"
              src="https://drive-thirdparty.googleusercontent.com/64/type/image/jpeg"
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};
