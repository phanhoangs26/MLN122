import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Leaderboard from "./pages/Leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/map",
    Component: Map,
  },
  {
    path: "/quiz/:stageId",
    Component: Quiz,
  },
  {
    path: "/result",
    Component: Result,
  },
  {
    path: "/leaderboard",
    Component: Leaderboard,
  },
]);
