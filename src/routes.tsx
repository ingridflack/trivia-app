import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Trivia from "./pages/Trivia";
import TriviaHistory from "./pages/TriviaHistory";
import Config from "./pages/Config";

import Home from "./pages/Home";
import TriviaInvite from "./pages/TriviaInvite";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    element: <PrivateRoute Component={Config} />,
  },
  {
    path: "/trivia/:triviaId",
    element: <PrivateRoute Component={Trivia} />,
  },
  {
    path: "/trivia/history",
    element: <PrivateRoute Component={TriviaHistory} />,
  },
  {
    path: "/trivia/:triviaId/invite/accept",
    element: <PrivateRoute Component={TriviaInvite} />,
  },
]);
