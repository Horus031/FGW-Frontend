import { create } from "zustand";

interface RoleStore {
  role: string | null;
  setRole: (role: string) => void;
  clearRole: () => void;
}

export const useRoleStore = create<RoleStore>()((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clearRole: () => set({ role: null }),
}));
