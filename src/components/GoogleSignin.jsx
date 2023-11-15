import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import auth from "../../firebasecofig";
export default () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider).then(console.log("umm yeah"));
  getRedirectResult(auth)
    .then((result) => {
      console.log("inside Redirect URL");
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log("GOogle log in ", user);
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("email", user.email);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.

      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};
