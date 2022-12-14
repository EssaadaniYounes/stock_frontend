import create from "zustand";


export const useMainStore = create(set => ({
    clients: [],
    vendors: [],
    categories: [],
    products: [],
    units: [],
    clientsInvoices: [],
    vendorsInvoices: [],
    roles: [],
    users: [],
    config: {},
    cities: [],
    payMethods: [],
    reportTypes: [],
    printers: [],
    setClients: (value) => set(state => ({ clients: value })),
    setVendors: (value) => set(state => ({ vendors: value })),
    setCategories: (value) => set(state => ({ categories: value })),
    setProducts: (value) => set(state => ({ products: value })),
    setUnits: (value) => set(state => ({ units: value })),
    setClientsInvoices: (value) => set(state => ({ clientsInvoices: value })),
    setRoles: (value) => set(state => ({ roles: value })),
    setUsers: (value) => set(state => ({ users: value })),
    setConfig: (value) => set(state => ({ config: value })),
    setCities: (value) => set(state => ({ cities: value })),
    setPayMethods: (value) => set(state => ({ payMethods: value })),
    setVendorsInvoices: (value) => set(state => ({ vendorsInvoices: value })),
    setReportTypes: (value) => set(state => ({ reportTypes: value })),
    setPrinters: (value) => set(state => ({ printers: value }))
}))

