import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://backendbarokah-production-c3d2.up.railway.app',
  timeout: 1000,
  // headers: {
  //   "Content-Type": "application/json",
  // }
  // ini ganggu ke upload dan create excel di bagian conten type
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance
