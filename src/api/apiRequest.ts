import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { refreshToken } from "./requests/auth.api";

const api: AxiosInstance = axios.create({
  baseURL: "/requests",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // This ensures cookies are sent automatically
});

// Request interceptor to log requests (cookies are sent automatically with withCredentials: true)

let isRefreshing = false;

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// --- Request interceptor (for logging) ---
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`API Request - ${config.method?.toUpperCase()} ${config.url}`, {
      withCredentials: config.withCredentials,
      headers: config.headers,
    });
    // console.log('API Request - Cookies will be sent automatically by browser');
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor: xử lý lỗi chung
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // console.log("API Interceptor - Refreshing token...");
        await refreshToken();
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // console.error("API Interceptor - Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status && error.response.status >= 500) {
      console.error("Server error:", error);
    }

    return Promise.reject(error);
  }
);

export default api;
