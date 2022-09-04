import create from "zustand";


export const useMainStore = create(set => ({
    clients: [],
    vendors: [],
    categories: [],
    products: [],
    units: [],
    clientsInvoices: [],
    setClients: (value) => set(state => ({ clients: value })),
    setVendors: (value) => set(state => ({ vendors: value })),
    setCategories: (value) => set(state => ({ categories: value })),
    setProducts: (value) => set(state => ({ products: value })),
    setUnits: (value) => set(state => ({ units: value })),
    setClientsInvoices: (value) => set(state => ({ clientsInvoices: value })),
}))

