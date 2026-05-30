import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Theory from "./pages/Theory";
import VietnamState from "./pages/VietnamState";
import CapitalistState from "./pages/CapitalistState";
import Games from "./pages/Games";
import Chatbot from "./pages/Chatbot";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/theory",
    Component: Theory,
  },
  {
    path: "/vietnam",
    Component: VietnamState,
  },
  {
    path: "/tu-ban",
    Component: CapitalistState,
  },
  {
    path: "/game",
    Component: Games,
  },
  {
    path: "/chat",
    Component: Chatbot,
  },
]);
