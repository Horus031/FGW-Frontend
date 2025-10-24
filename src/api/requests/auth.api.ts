import { type UserAuth, type UserInfo } from "../../models/user";
import api from "../apiRequest";

export const login = async () => {
  const backendUrl = import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.VITE_BACKEND_URL;

  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  // Open OAuth in popup with mode=popup
  const popup = window.open(
    `${backendUrl}/auth/google?mode=popup`,
    'Google Login',
    `width=${width},height=${height},left=${left},top=${top}`
  );

  interface AuthMessage {
    type: 'AUTH_SUCCESS' | string;
    success?: boolean;
    [key: string]: unknown;
  }

  const handleMessage = (event: MessageEvent<AuthMessage>): void => {
    // Verify origin
    if (event.origin !== backendUrl) return;
    
    const data = event.data;
    
    if (data.type === 'AUTH_SUCCESS' && data.success) {
      popup?.close();
      window.removeEventListener('message', handleMessage);
      
      // Cookies are now set! Redirect
      window.location.href = '/dashboard';
    }
  };

  window.addEventListener('message', handleMessage);

  // Cleanup
  const interval = setInterval(() => {
    if (popup?.closed) {
      clearInterval(interval);
      window.removeEventListener('message', handleMessage);
    }
  }, 1000);
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
