import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const HomeLayout = lazy(() => import("@/layout/HomeLayout"));

// import Register from "@/auth/Register";
// import LogIn from "@/auth/Login";
// import Recovery from "@/auth/Recovery";

const Register = lazy(() => import("@/auth/Register"));
const LogIn = lazy(() => import("@/auth/Login"));
const Recovery = lazy(() => import("@/auth/Recovery"));

const Profile = lazy(() => import("@/pages/Profile"));
const Feed = lazy(() => import("@/pages/Feed"));
const PostDetailsPage = lazy(() => import("@/pages/PostDetailsPage"));
const PostSearchPage = lazy(() => import("@/pages/PostSearchPage"));
const SmallScreenSearchPage = lazy(
  () => import("@/pages/SmallScreenSearchPage")
);
const PostForm = lazy(() => import("@/pages/PostForm"));
const Settings = lazy(() => import("@/pages/Settings"));
const Library = lazy(() => import("@/pages/Library"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// import NotFound from "@/pages/NotFound";
// import Feed from "@/pages/Feed";
// import PostDetailsPage from "@/pages/PostDetailsPage";
// import PostSearchPage from "@/pages/PostSearchPage";
// import SmallScreenSearchPage from "@/pages/SmallScreenSearchPage";
// import PostForm from "@/pages/PostForm";
// import Settings from "@/pages/Settings";
// import Library from "@/pages/Library";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Feed />,
        },
        {
          path: "/profile/:username",
          element: <Profile />,
        },
        {
          path: "/write-post",
          element: <PostForm />,
        },
        {
          path: "/post/:postname",
          element: <PostDetailsPage />,
        },
        {
          path: "/post/search",
          element: <PostSearchPage />,
        },
        {
          path: "/search",
          element: <SmallScreenSearchPage />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/me/lists",
          element: <Library />,
        },
      ],
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
    {
      path: "/auth/log-in",
      element: <LogIn />,
    },
    {
      path: "/auth/recovery",
      element: <Recovery />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return router;
};

export const router = Router();
