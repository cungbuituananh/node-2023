import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import App from "../App";

export const listRoute = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login />, exact: true },
]);
