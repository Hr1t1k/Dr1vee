import HeaderDrive from "./components/Header/HeaderDrive";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutProvider } from "./context/LayoutContext";
import { onAuthStateChanged } from "firebase/auth";
import auth, { db } from "../firebasecofig";
import GoogleSignin from "./components/GoogleSignin";
import PathContext, { PathProvider } from "./context/PathContext";
import {
  writeBatch,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import ROOT_FOLDER from "./components/RootFolders";
function App() {
  //const [user, setUser] = useState(null);
  const [path, setPath] = useState([]);
  const [folderID, setFolderID] = useState(null);
  // const [root,setRoot]=useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [grid, setGrid] = useState(
    window.localStorage.getItem("grid") === "false" ? false : true
  );
  onAuthStateChanged(
    auth,
    async (user) => {
      const startTime = performance.now();

      if (auth.currentUser) {
        localStorage.setItem("uid", auth.currentUser.uid);
        localStorage.setItem("photoURL", user.photoURL);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef).then(async (docSnap) => {
          if (docSnap.exists()) {
          } else {
            const batch = writeBatch(db);
            for (const [key, value] of Object.entries(ROOT_FOLDER)) {
              batch.set(doc(collection(db, "Folders")), {
                files: [],
                folders: [],
                name: value.name,
                owner: user.uid,
                id: key,
                path: [key],
              });
            }
            batch.set(doc(db, "Folders", "deleted"), {
              folders: [],
              files: [],
            });
            await batch.commit();
            setDoc(doc(db, "users", user.uid), {
              id: user.uid,
            });
          }
        });
        const endTime = performance.now();

        if (location.pathname == "/") navigate("/my-drive");
      } else {
        //setUser(null);
        localStorage.removeItem("uid");
        localStorage.removeItem("photoURL");
        GoogleSignin();
      }
    },
    []
  );

  return (
    <>
      {
        <div className="p-0 body">
          <HeaderDrive />

          <div className="d-inline-flex w-100">
            <PathProvider value={{ path, setPath, folderID, setFolderID }}>
              <Sidebar />
              <LayoutProvider value={{ grid, setGrid }}>
                <Outlet />
              </LayoutProvider>
            </PathProvider>
          </div>
        </div>
      }
    </>
  );
}

export default App;
