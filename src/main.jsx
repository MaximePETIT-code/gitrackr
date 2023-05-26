import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import UserRepositories from "./pages/UserRepositories/UserRepositories";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <Error/>,
  },
  {
    path: "/:userId",
    element: <Root/>,
    children: [
      {
        path: "/:userId",
        element: <UserDashboard/>,
      },
      {
        path: "/:userId/repositories",
        element: <UserRepositories/>,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
