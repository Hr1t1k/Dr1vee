import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebasecofig";
import { useNavigate } from "react-router-dom";
export default () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(() => {
    navigate("/");
  });
};
