import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/about_us",
    element: <AboutUs/>,
    // children: [
    //   {
    //     index: true,
    //     element: <Navigate to="/dashboard" />,
    //   },
    // ],
  },
])
