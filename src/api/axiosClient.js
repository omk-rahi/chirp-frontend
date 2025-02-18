import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosClient = axios.create({
  baseURL: `${backendUrl}/api`,
  withCredentials: true,
});

export default axiosClient;
