import axios, { type AxiosInstance, type AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_NODE_ENV == "development" ? "http://localhost:3000" : import.meta.env.VITE_API_URL}`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Response interceptor: xử lý lỗi chung
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // Ví dụ: token hết hạn → logout
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    if (status >= 500) {
      console.error("Server error:", error);
    }
    return Promise.reject(error);
  }
);

export default api;
