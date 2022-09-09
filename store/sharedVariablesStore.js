import create from "zustand";


export const useSharedVariableStore = create(set => ({
    showSideBar: true,
    showCategory: false,
    showVendor: false,
    showUnit: false,
    setShowSideBar: (value) => set(state => ({ showSideBar: value })),
    setShowCategory: (value) => set(state => ({ showCategory: value })),
    setShowVendor: (value) => set(state => ({ showVendor: value })),
    setShowUnit: (value) => set(state => ({ showUnit: value })),
}))

