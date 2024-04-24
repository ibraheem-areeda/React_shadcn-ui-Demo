import axios from "axios";

let isRefreshing = false;
let failedRequests = [];

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
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      console.log("Refffffrsh");
      if (!isRefreshing) {
        isRefreshing = true
        const userData = JSON.parse(localStorage.getItem("userInfo"));
        try {
          const response = await axios.post('http://localhost:8000/auth/refreshToken', { refresh_token: userData?.refresh_token });
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...userData,
              access_token: response.data.access_token,
              refresh_token: response.data.refresh_token,
            })
          )
          isRefreshing = false
          failedRequests.forEach((requestFunc) => {
            requestFunc()
          })
          
          return axiosJWT(originalRequest)
        } catch (error) {
          localStorage.removeItem("userInfo");
          window.location.reload();
        }
      }

      if(isRefreshing){
        return new Promise((resolve, reject) => {
          failedRequests.push(() => {
            resolve(axiosJWT(originalRequest))
          })
        })
      }
    }
    return Promise.reject(error);
  }
);
