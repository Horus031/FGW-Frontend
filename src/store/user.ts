import {create} from "zustand"
import type { User } from "../models/user"

type UserState = {
    user: User | null,
    setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({user})
}))