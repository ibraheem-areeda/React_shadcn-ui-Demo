import axios from "axios";

let isRefreshing = false;
let failedRequests = [];

const ResendRequests = (error, token = null) => {
  failedRequests.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
}
  failedRequests = [];

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

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log("Refffffrsh");
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedRequests.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }
      originalRequest._retry = true;
      isRefreshing = true;
      
      
      return new Promise(function (resolve, reject) {
        const userData = JSON.parse(localStorage.getItem("userInfo"));

       axios.post('http://localhost:8000/auth/refreshToken', { refresh_token: userData?.refresh_token })

       .then((response) => { 
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...userData,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          })
        );
           axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
           originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;
           ResendRequests(null, response.data.access_token);
           resolve(axios(originalRequest));
       })
       .catch((err) => {
           ResendRequests(err, null);
           reject(err);
           localStorage.removeItem("userInfo");
          window.location.reload()

       })
       .finally(() => { isRefreshing = false })
   })
      




  }
  return Promise.reject(error);
}
);
// localStorage.removeItem("userInfo");
// window.location.reload()






// const response = axios.post(
        //   "http://127.0.0.1:8000/auth/refreshToken",
        //   { refresh_token: userData?.refresh_token },
        //   {
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //   }
        // )

        // localStorage.setItem(
        //   "userInfo",
        //   JSON.stringify({
        //     ...userData,
        //     access_token: response.data.access_token,
        //     refresh_token: response.data.refresh_token,
        //   })
        // );

        // error.config.headers["Authorization"] =
        //   "Bearer " + response.data.access_token;
        // return axios(error.config);