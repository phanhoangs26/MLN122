import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { default: Component } = await import("./pages/Home");
      return { Component };
    },
  },
  {
    path: "/theory",
    lazy: async () => {
      const { default: Component } = await import("./pages/Theory");
      return { Component };
    },
  },
  {
    path: "/tu-ban",
    lazy: async () => {
      const { default: Component } = await import("./pages/CapitalistState");
      return { Component };
    },
  },
  {
    path: "/game",
    lazy: async () => {
      const { default: Component } = await import("./pages/Games");
      return { Component };
    },
  },
  {
    path: "/chat",
    lazy: async () => {
      const { default: Component } = await import("./pages/Chatbot");
      return { Component };
    },
  },
]);
