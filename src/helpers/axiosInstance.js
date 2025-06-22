import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://taskflowbackend-cbxp.onrender.com", 
  withCredentials: true,            //For cookies/auth
});

// Add token automatically to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;