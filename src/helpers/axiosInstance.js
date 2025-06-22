import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://taskflowbackend-cbxp.onrender.com", 
  withCredentials: true,            //For cookies/auth
});

export default axiosInstance;