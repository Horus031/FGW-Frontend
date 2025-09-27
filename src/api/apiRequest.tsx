// src/api/apiRequest.ts
import axios, { type AxiosInstance, type AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: thêm token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
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
