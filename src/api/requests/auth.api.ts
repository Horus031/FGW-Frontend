import type { UserInfo } from "../../models/user";
import api from "../apiRequest";

export const login = async () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
};

export const exchangeToken = async (code: string | null): Promise<UserInfo> => {
  if (!code) throw new Error("Authorization code is missing");

  const response = await api.post<UserInfo>("/auth/exchange", { code });
  const data = response.data;

  console.log("exchangeToken - Backend response:", data);

  // Check if backend returned tokens instead of user data
  // The backend returns {accessToken, refreshToken} so we need to fetch user info
  if (!data.id && !data.email) {
    console.log("exchangeToken - Tokens received, fetching user data from /auth/me");
    
    // The cookies/tokens should be set by the backend, now fetch user info
    const userResponse = await api.get<UserInfo>("/auth/me");
    console.log("exchangeToken - User data from /auth/me:", userResponse.data);
    return userResponse.data;
  }

  return data;
};

export const getMe = async () => {
  const response = await api.get<UserInfo>("/auth/me");
  console.log("getMe - Backend response:", response.data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  if (!response.data) {
    throw new Error("Logout endpoint returned no data");
  }

  return response.data;
};
