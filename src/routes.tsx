import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Trivia from "./pages/Trivia";
import TriviaHistory from "./pages/TriviaHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/trivia/config",
    element: <PrivateRoute Component={Home} />,
  },
  {
    path: "/trivia/:triviaId",
    element: <PrivateRoute Component={Trivia} />,
  },
  {
    path: "/trivia/history",
    element: <PrivateRoute Component={TriviaHistory} />,
  },
]);
