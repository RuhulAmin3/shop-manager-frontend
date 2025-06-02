import Dashboard from "@/pages/dashboard";
import Index from "@/pages/Index";
import SigninPage from "@/pages/signin";
import SignupPage from "@/pages/signup";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
