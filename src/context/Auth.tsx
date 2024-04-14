import { User } from "@/types/User";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const AuthContext = createContext<User | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>(
    JSON.parse(localStorage.getItem("userInfo")) || undefined
  );
  console.log(5555555555, user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
