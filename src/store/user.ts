import { create } from "zustand";
import type { UserInfo } from "../models/user";

interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

// Load user from localStorage on initialization
const loadUserFromStorage = (): UserInfo | null => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to load user from localStorage:", error);
    return null;
  }
};

export const useUserStore = create<UserStore>()((set) => ({
  user: loadUserFromStorage(),
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}));
