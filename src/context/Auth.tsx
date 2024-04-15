import { User } from "@/types/User";
import axios from "axios";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext<User | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>(
    JSON.parse(localStorage.getItem("userInfo")) || undefined
  );

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let userData = JSON.parse(localStorage.getItem("userInfo"));
      console.log("access token:", userData?.access_token);
      console.log("refresh token:", userData?.refresh_token);

      if (userData && userData.access_token) {
        config.headers["Authorization"] = "Bearer " + userData.access_token;
      }
      config.headers["Accept"] = "application/json";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosJWT.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response && error.response.status === 401) {
        console.log("Refffffrsh");

        try {
          let userData = JSON.parse(localStorage.getItem("userInfo"));
          console.log("refresh_token", userData?.refresh_token);

          const response = await axios.post(
            "https://dev.api.portal.psi-crm.com/auth/refreshToken",
            { refresh_token: userData?.refresh_token },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          console.log("newwwwwwwwwwwww", response.data);

          setUser((previousValue) => ({
            ...previousValue,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          }));

          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...userData,
              access_token: response.data.access_token,
              refresh_token: response.data.refresh_token,
            })
          );

          error.config.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          return axios(error.config);
        } catch (error) {
          localStorage.removeItem("userInfo");
          window.location.reload();
        }
      }
      return Promise.reject(error);
    }
  );

  const handelUserChange = (userData) => {
    setUser(userData.data);
    localStorage.setItem("userInfo", JSON.stringify(userData.data));
  };

  if (user) {
    axiosJWT
      .get("https://dev.api.portal.psi-crm.com/auth/currentUser", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <AuthContext.Provider value={{ user, handelUserChange }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
