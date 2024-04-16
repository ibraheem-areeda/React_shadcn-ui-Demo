/* eslint-disable @typescript-eslint/no-unused-vars */

import { RouterProvider } from "react-router-dom";
import { authRoutes, privateRoutes } from "./routes";
import { atom, useAtom } from "jotai";
import { userAtom } from "./pages/Home";
import { log } from "console";

function App() {
  const [user] = useAtom(userAtom);

  return <RouterProvider router={user ? privateRoutes : authRoutes} />;
}

export default App;
