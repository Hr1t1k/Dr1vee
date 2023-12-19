import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import auth from "../../firebasecofig";
export default () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};
