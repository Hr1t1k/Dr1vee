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
} from "firebase/firestore";
import ROOT_FOLDER from "./components/RootFolders";
function App() {
  //const [user, setUser] = useState(null);
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [grid, setGrid] = useState(
    window.localStorage.getItem("grid") === "false" ? false : true
  );
  onAuthStateChanged(
    auth,
    async (user) => {
      console.log("inside auth");
      if (auth.currentUser) {
        //setUser(user.uid);
        localStorage.setItem("uid", auth.currentUser.uid);
        localStorage.setItem("photoURL", user.photoURL);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef).then(async (docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
            for (const [key, value] of Object.entries(ROOT_FOLDER)) {
              addDoc(collection(db, "folders"), {
                files: [],
                folders: [],
                name: value.name,
                path: value.name,
                owner: user.uid,
                id: key,
              });
              await setDoc(doc(db, "users", user.uid), {
                id: user.uid,
              });
            }
          }
        });

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
            <PathProvider value={{ path, setPath }}>
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
