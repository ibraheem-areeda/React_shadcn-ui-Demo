/* eslint-disable @typescript-eslint/no-unused-vars */

import { RouterProvider } from "react-router-dom";
import { authRoutes, privateRoutes } from "./routes";
import AuthContext from "./context/Auth";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return <RouterProvider router={user ? privateRoutes : authRoutes} />;
}

export default App;
