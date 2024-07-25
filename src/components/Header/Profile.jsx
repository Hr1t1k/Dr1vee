import { signOut } from "firebase/auth";
import auth from "../../../firebasecofig";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/UserContext";
export default () => {
  const navigate = useNavigate();
  const { authLoaded } = useAuth();
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  useEffect(() => {
    if (authLoaded) {
      setEmail(auth.currentUser.email);
      setPhotoURL(auth.currentUser.photoURL);
    }
  }, [authLoaded]);
  return (
    <div className="flex-shrink-0 dropdown me-2">
      <a
        href="#"
        className="d-block link-body-emphasis text-decoration-none "
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <>
          <img
            src={photoURL}
            alt="mdo"
            width="32"
            height="32"
            className="rounded-circle "
          />
        </>
      </a>
      <ul className="dropdown-menu text-small shadow">
        <li>
          <a className="dropdown-item" href="#">
            {email}
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Settings
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Profile
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            className="btn dropdown-item"
            onClick={() => {
              signOut(auth).then(() => {
                localStorage.removeItem("uid");
                localStorage.removeItem("email");
                navigate("/login");
              });
            }}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};
