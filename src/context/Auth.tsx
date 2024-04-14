import { User } from "@/types/User";
import axios from "axios";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const AuthContext = createContext<User | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>(
    JSON.parse(localStorage.getItem("userInfo")) || undefined
  );

  const handelUserChange = (userData) => {
    setUser(userData.data);
    localStorage.setItem("userInfo", JSON.stringify(userData.data));
  };
  if (user) {
    axios
      .get("https://dev.api.portal.psi-crm.com/auth/currentUser", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log(5555555555, "okkkkk");
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("userInfo");
        window.location.reload();
      });
  }

  return (
    <AuthContext.Provider value={{ user, handelUserChange }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
