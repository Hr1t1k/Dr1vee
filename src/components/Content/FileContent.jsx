import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebasecofig";
import useAuth from "../../context/UserContext";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Button } from "bootstrap";

const MyNoRenderer = ({ document: d, fileName }) => {
  const fileText = fileName || d?.fileType || "";
  if (fileText) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center h-100 w-100 text-center  p-3 rounded shadow-sm">
        <div className="mb-3" style={{ fontSize: "1.2rem", color: "#333" }}>
          No Renderer for {fileText}
        </div>

        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            const a = document.createElement("a");
            a.href = d.uri;
            a.download = fileName || "downloaded-file";
            a.click();
          }}
        >
          Download File
        </button>
      </div>
    );
  }

  return <div>No Renderer Error!</div>;
};
const FileContent = () => {
  const params = useParams();
  const location = useLocation();
  const [URI, setURI] = useState([]);
  const { authLoaded } = useAuth();
  const docRef = doc(db, "Files", params.fileId);
  const fetchFile = (downloadURL, fileType, name) => {
    setURI([{ uri: downloadURL, fileType: fileType, fileName: name }]);
  };
  useEffect(() => {
    if (authLoaded) {
      getDoc(docRef)
        .then((docSnap) => {
          fetchFile(
            docSnap.data().downloadURL,
            docSnap.data().fileType,
            docSnap.data().name
          );
        })
        .catch((err) => console.log(err));
    }
  }, [location, authLoaded]);

  return (
    <>
      <div className="overflow-auto" style={{ maxHeight: "100%" }}>
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={URI}
          config={{
            noRenderer: {
              overrideComponent: MyNoRenderer,
            },
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false,
            },
          }}
        />
      </div>
    </>
  );
};

export default FileContent;
