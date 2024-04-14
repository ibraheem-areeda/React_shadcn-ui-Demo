import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";

export const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about_us",
    element: <AboutUs />,
  },
]);

export const authRoutes = createBrowserRouter([
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);
