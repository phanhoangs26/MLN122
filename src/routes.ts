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
    path: "/games",
    lazy: async () => {
      const { default: Component } = await import("./pages/Games");
      return { Component };
    },
  },
  {
    path: "/games/quiz",
    lazy: async () => {
      const { default: Component } = await import("./pages/games/QuizGame");
      return { Component };
    },
  },
  {
    path: "/games/match",
    lazy: async () => {
      const { default: Component } = await import("./pages/games/MatchGame");
      return { Component };
    },
  },


  {
    path: "/about",
    lazy: async () => {
      const { default: Component } = await import("./pages/About");
      return { Component };
    },
  }
]);
