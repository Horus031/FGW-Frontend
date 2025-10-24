import axios, { type AxiosInstance, type AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/requests",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: xử lý lỗi chung
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // logout();
      // window.location.href = "/login";
    }
    if (status >= 500) {
      console.error("Server error:", error);
    }
    return Promise.reject(error);
  }
);

export default api;
