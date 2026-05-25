import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Theory from "./pages/Theory";
import Map from "./pages/Map";
import Maze from "./pages/Maze";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

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
    path: "/maze/:stageId",
    Component: Maze,
  },
  {
    path: "/theory",
    Component: Theory,
  },
  {
    path: "/quiz/:stageId",
    Component: Quiz,
  },
  {
    path: "/result",
    Component: Result,
  },
]);
