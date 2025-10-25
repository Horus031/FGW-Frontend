import type { UserInfo } from "../../models/user";
import api from "../apiRequest";

export const login = async () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
};

export const exchangeToken = async (code: string | null): Promise<UserInfo> => {
  if (!code) throw new Error("Authorization code is missing");

  const response = await api.post<UserInfo>("/auth/exchange", { code });
  const data: UserInfo = response.data;

  // Check if backend returned a message object instead of user data
  if (typeof data === "string" || (data && "message" in data && !data.id && !data.email)) {
    // Backend returned a success message, fetch user info from /auth/me
    // The cookies will be sent automatically
    const userResponse = await api.get<UserInfo>("/auth/me");
    return userResponse.data;
  }

  return response.data;
};

export const getMe = async () => {
  const response = await api.get<UserInfo>("/auth/me");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  if (!response.data) {
    throw new Error("Logout endpoint returned no data");
  }

  return response.data;
};
