import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebasecofig";
import { Loading } from "./components/Loading.jsx";
import Home from "./components/Home.jsx";
const PublicRoute = lazy(() => import("./components/PublicRoute.jsx"));
// const ProtectedRoute = lazy(() => import("./components/ProtectedRoute.jsx"));
const Error = lazy(() => import("./components/Error.jsx"));
// const Drive = lazy(() => import("./components/Drive.jsx"));
// const Content = lazy(() => import("./components/Content/Content.jsx"));
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Drive from "./components/Drive.jsx";
import Content from "./components/Content/Content.jsx";
import usePath from "./context/PathContext.js";
import { UserProvider } from "./context/UserContext.js";
import FileContent from "./components/Content/FileContent.jsx";
const Register = lazy(() => import("./components/Auth/Register.jsx"));
const Login = lazy(() => import("./components/Auth/Login.jsx"));
const ForgetPassword = lazy(() =>
  import("./components/Auth/ForgetPassword.jsx")
);
function App() {
  const [loaded, setLoaded] = useState(true);
  const [authLoaded, setAuthLoaded] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      element: <PublicRoute />,
      errorElement: <Error />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/resetpassword",
          element: <ForgetPassword />,
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      errorElement: <Error />,
      children: [
        {
          path: "drive",
          element: <Drive />,
          errorElement: <Error />,
          children: [
            {
              path: "/drive/:name",
              element: <Content />,
              errorElement: <Error />,
            },
            {
              path: "/drive/search/:search",
              element: <Content />,
            },
            {
              path: "/drive/folders/:folderId",
              element: <Content />,
              // errorElement: <Error />,
            },
            {
              path: "/drive/files/:fileId",
              element: <FileContent />,
            },
          ],
        },
      ],
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthLoaded(true);
        localStorage.setItem("signedIn", true);
      } else {
        localStorage.removeItem("signedIn");
      }
    });
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <UserProvider value={{ authLoaded }}>
          <RouterProvider router={router} />
        </UserProvider>
      </Suspense>
    </>
  );
}

export default App;
