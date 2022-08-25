import create from "zustand";
import { persist } from 'zustand/middleware'


// export const useAuthStore = create(set => ({
//     isLoggedIn: false,
//     user: {},
//     setUser: (value) => set(state => ({ user: value })),
//     setIsLoggedIn: (value) => set(state => ({ isLoggedIn: value })),
// }))

export const useAuthStore = create(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            user: {},
            setUser: (value) => set(state => ({ user: value })),
            setIsLoggedIn: (value) => set(state => ({ isLoggedIn: value })),
        })
    ),
    { name: 'auth' }

)


