import create from "zustand";


export const useAuthStore = create(set => ({
    isLoggedIn: false,
    user: {},
    setUser: (value) => set(state => ({ user: value })),
    setIsLoggedIn: (value) => set(state => ({ isLoggedIn: value })),
}))

