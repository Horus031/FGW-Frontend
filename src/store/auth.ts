import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserAuth } from "../models/user";


type AuthState = {
  token: UserAuth | null;
  setToken: (token: UserAuth | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: UserAuth | null) => set({ token }),
    }),
    {
      name: "auth",
    }
  )
);