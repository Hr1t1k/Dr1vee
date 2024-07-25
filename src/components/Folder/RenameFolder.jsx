import React, { useState } from "react";

import renameFolder from "../functions/rename";
import rename from "../functions/rename";
function ModalNewfolder(props) {
  const [folderName, setFolderName] = useState("");
  return (
    <>
      <div
        className="modal fade"
        id="renameFolder"
        tabIndex="-1"
        aria-labelledby="renameFolder"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ width: "25%", minWidth: "350px" }}
        >
          <div className="modal-content">
            <div className="modal-body p-4">
              <h3 className="modal-title " id="renameFolder">
                Rename
              </h3>
              <input
                type="text"
                value={folderName}
                onChange={(event) => setFolderName(event.target.value)}
                className="input p-2 my-3 border border-primary  "
                style={{ width: "98%" }}
              ></input>
              <div className="d-flex justify-content-end gap-4">
                <button type="button" className="btn " data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn text-primary"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    rename(props.folder.id, folderName, 0);
                    setFolderName("");
                  }}
                  data-bs-dismiss="modal"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalNewfolder;
