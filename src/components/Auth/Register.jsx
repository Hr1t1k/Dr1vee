import { useState } from "react";
import AuthLogo from "../../assets/companyLogo.png";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiMail } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebasecofig";
import Google from ".././Google/Google";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        var user = response.user;
        updateProfile(user, { displayName: username }).then((res) => {
          axios.post(
            "/user/",
            {
              name: username,
              email: email,
              uid: response.user.uid,
              photoUrl:
                response.user.photoURL ||
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            },
            {
              headers: {
                Authorization: `Bearer ${response.user.accessToken}`,
              },
            }
          );
        });
        localStorage.setItem("signedIn", true);
        setTimeout(() => {
          navigate("/drive/my-drive");
        }, 1500);
        setLoading(false);
        toast.success("Account created successfully", {
          theme: "colored",
          autoClose: 1500,
        });
      } catch (error) {
        setLoading(false);
        console.error(error.message);
        if (error.code === "auth/email-already-in-use") {
          toast.error("User with this email already exists. Please log in.", {
            theme: "colored",
            autoClose: 1500,
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else if (error.code === "auth/weak-password") {
          toast.error("Password should be at least 8 characters.", {
            theme: "colored",
          });
        }
      }
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.error("Please enter your name", {
        theme: "colored",
        autoClose: 3000,
      });
    }
    if (email === "" || email === null) {
      result = false;
      toast.error("Please enter email", {
        theme: "colored",
        autoClose: 3000,
      });
    }
    if (password === "" || password === null) {
      result = false;
      toast.error("Please enter your password", {
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
            <h2 className="text-center text-dark font-bold mb-4">
              Create Your Account
            </h2>
            <p className="text-dark text-center mb-4">
              Sign Up to enjoy all of the features in the app
            </p>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <div className="input-group input-group-lg">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    outline: "none",
                    boxShadow: "  none",
                    fontSize: "16px",
                  }}
                  required
                />
              </div>
            </div>
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
              <div className="input-group input-group-lg">
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

            <button
              type="submit"
              onClick={handleSignUp}
              className="btn btn-primary btn-lg w-100 mt-4"
              style={{
                backgroundColor: "#5a03fc",
                border: "none",
                fontSize: "16px",
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Create Account"}
            </button>
          </form>
          <div className="d-flex justify-content-center align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2">or</span>
            <hr className="flex-grow-1" />
          </div>
          <Google />
          <p className="text-center mt-3">
            Already have an account?
            <Link to="/login" className="text-primary ms-2">
              Login here
            </Link>
          </p>
        </div>
        <ToastContainer transition={Zoom} />
      </div>
    </div>
  );
};

export default Register;
