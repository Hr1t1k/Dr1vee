import React from "react";
export default () => {
  return (
    <div className="no-content d-flex flex-column align-items-center justify-content-center ">
      <div className="w-100  text-center">
        <img
          width={"30%"}
          style={{ minWidth: "200px" }}
          role="presentation"
          src="//ssl.gstatic.com/docs/doclist/images/empty_state_computers_v2.svg"
        ></img>
        <h3>No Computers Syncing</h3>
        <p>
          Folders on your computer that you sync with Drive using Drive for
          desktop will show up here.
        </p>
      </div>
    </div>
  );
};
