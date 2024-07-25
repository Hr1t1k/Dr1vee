import { useState } from "react";
import AuthLogo from "../../assets/companyLogo.png";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiMail } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebasecofig";
import Google from ".././Google/Google";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem("signedIn", true);
          navigate("/drive/my-drive");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/invalid-email"
          ) {
            toast.error("Incorrect email or password. Please try again.", {
              theme: "colored",
            });
          } else if (error.code === "auth/invalid-credential") {
            toast.error("Incorrect Email Address or Password.", {
              theme: "colored",
            });
          } else {
            toast.error("An error occurred. Please try again later.", {
              theme: "colored",
            });
            console.error(error);
          }
        });
    }
  };

  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.error("Please Enter Email Address", {
        theme: "colored",
        autoClose: 3000,
      });
    }
    if (password === "" || password === null) {
      result = false;
      toast.error("Please Enter Password", {
        theme: "colored",
        autoClose: 3000,
      });
    }
    return result;
  };

  return (
    <div className="container-fluid d-flex vh-100 w-100 p-0 m-0">
      <div className="col-6 d-none d-md-block w-50 overflow-hidden p-5">
        <img className="img-fluid h-100" src={AuthLogo} alt="Logo" />
      </div>
      <div className="col-12 col-md-6  d-flex justify-content-center align-items-md-center align-items-start bg-white p-0 pt-5 p-md-5  overflow-hidden">
        <div
          className="w-100 p-2 p-md-5 justify-content-center"
          style={{ maxWidth: "500px" }}
        >
          <form>
            <h2 className="text-center text-dark font-bold mb-4">Log In</h2>
            <p className="text-dark text-center mb-4">
              Enter your credentials to access your account
            </p>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-group input-group-lg">
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    outline: "none",
                    boxShadow: "  none",
                    fontSize: "16px",
                  }}
                  required
                />
                <span className="input-group-text">
                  <CiMail />
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password-input" className="form-label">
                Password
              </label>
              <div className="input-group input-group-lg ">
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    outline: "none",
                    boxShadow: "  none",
                    fontSize: "16px",
                  }}
                  required
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="remember"
                  className="form-check-input"
                />
                <label htmlFor="remember" className="form-check-label">
                  Remember for 30 days
                </label>
              </div>
              <Link to="/resetpassword" className="text">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="btn btn-primary w-100 mt-4"
              style={{
                backgroundColor: "#5a03fc",
                border: "none",
                fontSize: "16px",
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Log Into Account"}
            </button>
          </form>
          <div className="d-flex justify-content-center align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2">or</span>
            <hr className="flex-grow-1" />
          </div>
          <Google />
          <p className="text-center mt-3">
            Are you new here?
            <Link to="/register" className="text-primary ms-2">
              Create Account
            </Link>
          </p>
        </div>
        <ToastContainer transition={Zoom} />
      </div>
    </div>
  );
};

export default Login;
