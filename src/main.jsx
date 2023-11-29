import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../src/scss/styles.scss";
import * as bootstrap from "bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Content from "./components/Content/Content.jsx";
import Error from "./components/Error.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/:name",
        element: <Content />,
        // errorElement: <Error />,
      },

      {
        path: "/folders/:folderId",
        element: <Content />,
        errorElement: <Error />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
