import create from "zustand";


export const useSharedVariableStore = create(set => ({
    showSideBar: false,
    setShowSideBar: (value) => set(state => ({ showSideBar: value })),
}))

