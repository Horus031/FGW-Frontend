import type { UserAuth, UserInfo } from "../../models/user";
import api from "../apiRequest";

export const login = async () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
};

export const exchangeToken = async (code: string | null): Promise<UserAuth> => {
  if (!code) throw new Error("Authorization code is missing");

  const response = await api.post<UserAuth>("/auth/exchange", { code });
 
  return response.data;
};

export const getMe = async () => {
  const response = await api.get<UserInfo>("/auth/me");
  console.log("getMe - Backend response:", response.data);
  return response.data;
};

export const refreshToken = async () => {
  await api.post<UserInfo>("/auth/refresh");
  return;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  if (!response.data) {
    throw new Error("Logout endpoint returned no data");
  }

  return response.data;
};
