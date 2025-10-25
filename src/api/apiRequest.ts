import axios, { type AxiosInstance, type AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/requests",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // This ensures cookies are sent automatically
});

// Request interceptor (cookies are sent automatically with withCredentials: true)
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor: Handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;