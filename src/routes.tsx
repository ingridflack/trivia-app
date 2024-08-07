import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Home Page</p>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);
