import Dashboard from "@/pages/dashboard";
import Index from "@/pages/Index";
import ShopPage from "@/pages/shop";
import SigninPage from "@/pages/signin";
import SignupPage from "@/pages/signup";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import NotFoundPage from "@/pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/signin",
        element: <SigninPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
