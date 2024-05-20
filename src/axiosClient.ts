import axios from "axios";
import { User } from "./types/User";

let isRefreshing = false;
const failedRequests: CallableFunction[] = [];

export const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    const userLocalstorage = localStorage.getItem("userInfo");
    const userData: User = userLocalstorage
      ? JSON.parse(userLocalstorage)
      : undefined;
    console.log(4444444444444, userData);

    if (userData && userData.access_token) {
      console.log("okkkkkkkkkkkkkkkkkk");
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
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      console.log("Refffffrsh");
      if (!isRefreshing) {
        isRefreshing = true;
        const userLocalstorage = localStorage.getItem("userInfo");
        const userData: User | undefined = userLocalstorage
          ? JSON.parse(userLocalstorage)
          : undefined;
        try {
          const response = await axios.post(
            "https://dev.api.portal.psi-crm.com/auth/refreshToken",
            { refresh_token: userData?.refresh_token }
          );
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...userData,
              access_token: response.data.access_token,
              refresh_token: response.data.refresh_token,
            })
          );
          isRefreshing = false;
          failedRequests.forEach((requestFunc) => {
            requestFunc();
          });

          return axiosJWT(originalRequest);
        } catch (error) {
          localStorage.removeItem("userInfo");
          window.location.reload();
        }
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequests.push(() => {
            resolve(axiosJWT(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);
