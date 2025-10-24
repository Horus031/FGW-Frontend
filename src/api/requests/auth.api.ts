import { type UserAuth, type UserInfo } from "../../models/user";
import api from "../apiRequest";

export const login = async () => {
  window.location.href = `${
    import.meta.env.VITE_NODE_ENV == "development"
      ? `${import.meta.env.VITE_DEV_URL}`
      : import.meta.env.VITE_BACKEND_URL
  }/auth/google`;
};

export const exchangeToken = async (code: string | null): Promise<UserAuth> => {
  if (!code) throw new Error("Authorization code is missing");

  try {
    const response = await api.post<UserAuth>("/auth/exchange", { code });

    return response.data;
  } catch (error) {
    console.error("exchangeToken error:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get<UserInfo>("/auth/me", );
    return response.data;
  } catch (error) {
    console.error("getMe error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Nếu bạn có set cookie cho token
    document.cookie = "access_token=; Max-Age=0; path=/;";
    document.cookie = "refresh_token=; Max-Age=0; path=/;";

    const response = await api.post("/auth/logout");

    if (!response.data) {
      throw new Error("Logout endpoint returned no data");
    }

    return response.data;
  } catch (error) {
    console.error("logout error:", error);
    throw error;
  }
};
