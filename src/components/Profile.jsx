import { signOut } from "firebase/auth";
import auth from "../../firebasecofig";
import React from "react";
import { useNavigate } from "react-router-dom";
export default () => {
  const navigate = useNavigate();
  return (
    <div className="flex-shrink-0 dropdown me-2">
      <a
        href="#"
        className="d-block link-body-emphasis text-decoration-none "
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {auth.currentUser && (
          <img
            onClick={() => {
              console.log(auth.currentUser.photoURL);
            }}
            src={auth.currentUser.photoURL}
            alt="mdo"
            width="32"
            height="32"
            className="rounded-circle "
          />
        )}
      </a>
      <ul className="dropdown-menu text-small shadow">
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
                navigate("/");
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
