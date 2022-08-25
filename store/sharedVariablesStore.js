import create from "zustand";


export const useSharedVariableStore = create(set => ({
    showSideBar: false,
    showCategory: false,
    showVendor: false,
    setShowSideBar: (value) => set(state => ({ showSideBar: value })),
    setShowCategory: (value) => set(state => ({ showCategory: value })),
    setShowVendor: (value) => set(state => ({ showVendor: value })),
}))

