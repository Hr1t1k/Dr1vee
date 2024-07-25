import { useState } from "react";
import AuthLogo from "../../assets/companyLogo.png";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../../firebasecofig";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          navigate("/login");
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
    return result;
  };

  return (
    <div className="container-fluid d-flex vh-100 w-100 p-0 m-0">
      <div className="col-6 d-none d-md-block w-50 overflow-hidden p-5">
        <img className="img-fluid h-100" src={AuthLogo} alt="Logo" />
      </div>
      <div className="col-12 col-md-6  d-flex justify-content-center align-items-md-center align-items-start bg-white p-0 pt-5 p-md-5  overflow-hidden">
        <form
          className="w-100 p-2 p-md-5 justify-content-center"
          style={{ maxWidth: "500px" }}
        >
          <h2 className="text-center text-dark font-bold mb-4">
            Forgot Password
          </h2>
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
            {loading ? "Loading..." : "Send reset link"}
          </button>
        </form>
        <ToastContainer transition={Zoom} />
      </div>
    </div>
  );
};

export default ForgetPassword;
