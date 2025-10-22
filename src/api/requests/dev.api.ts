import api from "../apiRequest";
import { type UserAuth } from "../../models/user";


export const devLogin = async (email: string, password: string): Promise<UserAuth> => {
  try {
    const response = await api.post<UserAuth>("/auth/login", { email, password });

    const { accessToken, refreshToken } = response.data;

    // Save tokens for authenticated requests
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (error) {
    console.error("devLogin error:", error);
    throw error;
  }
};
