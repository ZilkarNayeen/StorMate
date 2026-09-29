import axios from "axios";

const defaultApiBaseUrl = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? "http://localhost:5713/api"
  : "https://stormate-8p52.onrender.com/api";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("pos-token") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
