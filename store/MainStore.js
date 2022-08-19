import create from "zustand";


export const useMainStore = create(set => ({
    clients: [],
    setClients: (value) => set(state => ({ clients: value })),
}))

