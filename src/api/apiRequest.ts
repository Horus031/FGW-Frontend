import axios, { type AxiosInstance, type AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/requests",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // This ensures cookies are sent automatically
});

// Request interceptor to log requests (cookies are sent automatically with withCredentials: true)
api.interceptors.request.use(
  (config) => {
    console.log(`API Request - ${config.method?.toUpperCase()} ${config.url}`, {
      withCredentials: config.withCredentials,
      headers: config.headers,
    });
    console.log('API Request - Cookies will be sent automatically by browser');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: xử lý lỗi chung
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;

    console.log("API Interceptor - Error caught:", {
      status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message,
    });

    if (status === 401) {
      console.error("API Interceptor - 401 Unauthorized");
      console.error("API Interceptor - URL:", error.config?.url);
      console.error("API Interceptor - Response:", error.response?.data);
      console.log("API Interceptor - Redirecting to login in 5 seconds...");

      // Add delay so you can see the error
      setTimeout(() => {
        window.location.href = "/login";
      }, 50000);
    }
    if (status >= 500) {
      console.error("Server error:", error);
    }
    return Promise.reject(error);
  }
);

export default api;