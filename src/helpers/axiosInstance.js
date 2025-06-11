import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3300", // ✅ Ensure this is correct
  withCredentials: true,            // ✅ For cookies/auth
});

export default axiosInstance;