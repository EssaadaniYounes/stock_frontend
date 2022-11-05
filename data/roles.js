const roles = {
    dashboard: ["create", "read", "update", "delete"],
    cities: ["create", "read", "update", "delete"],
    companies: ["create", "read", "update", "delete"],
    units: ["create", "read", "update", "delete"],
    categories: ["create", "read", "update", "delete"],
    products: ["create", "read", "update", "delete"],
    clients: ["create", "read", "update", "delete"],
    vendors: ["create", "read", "update", "delete"],
    users: ["create", "read", "update", "delete"],
    roles: ["create", "read", "update", "delete"],
    pay_methods: ["create", "read", "update", "delete"],
    report_types: ["create", "read", "update", "delete"],
    clients_invoices: ["create", "read", "update", "delete", "print"],
    clients_balance: ["create", "read", "update", "delete", "print"],
    suppliers_invoices: ["create", "read", "update", "delete", "print"],
    pos: ["create", "read", "update", "delete", "print"],
}
export default roles