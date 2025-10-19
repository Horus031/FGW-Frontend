import axios, { type AxiosInstance, type AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: `${
    import.meta.env.VITE_NODE_ENV == "development"
      ? import.meta.env.VITE_DEV_URL
      : import.meta.env.VITE_BACKEND_URL
  }`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: xử lý lỗi chung
api.interceptors.response.use(
  (response: AxiosResponse) => response, // ✅ trả về full AxiosResponse
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    if (status >= 500) {
      console.error("Server error:", error);
    }
    return Promise.reject(error);
  }
);

export default api;
