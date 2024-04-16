import axios from "axios";
import { log } from "console";
import { getDefaultStore } from "jotai";
import { userAtom } from "./pages/Home";

export const axiosJWT = axios.create();

 axiosJWT.interceptors.request.use(
  async (config) => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    console.log(4444444444444,userData);
    

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
    if (error.response && error.response.status === 401) {
      console.log("Refffffrsh");

      try {
        let userData = JSON.parse(localStorage.getItem("userInfo"));

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