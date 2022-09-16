import icons from "./iconsComponents";
const items = [
    {
        id: 1,
        key: "home",
        title: 'Home',
        icon: <icons.DashBoard />,
        subItems: [
            {
                key: 'clients',
                title: 'Clients',
                icon: <icons.Clients />,
                link: '/dashboard/clients'
            },
            {
                key: 'vendors',
                title: 'Vendors',
                icon: <icons.Vendor />,
                link: '/dashboard/vendors'
            },
            {
                key: 'companies',
                title: 'Company',
                icon: <icons.Company />,
                link: '/dashboard/companies/details'
            }
        ]
    },
    {
        id: 2,
        key:'stock',
        title: 'Stock',
        icon: <icons.Stock />,
        subItems: [
            {
                key: 'categories',
                title: 'Caregories',
                icon: <icons.Categories />,
                link: '/dashboard/categories'
            },
            {
                key: 'units',
                title: 'Units',
                icon: <icons.Unit />,
                link: '/dashboard/units'
            },
            {
                key: 'products',
                title: 'Products',
                icon: <icons.Product />,
                link: '/dashboard/products'
            },
        ]
    },
    {
        id: 3,
        key:'invoices',
        title: 'Invoices',
        icon: <icons.Invoice />,
        subItems: [
            {
                key: 'invoices',
                title: 'Clients invoices',
                icon: <icons.Invoices />,
                link: '/dashboard/clients/invoices'
            }
        ]
    },
    {
        id: 4,
        key: 'configuration',
        title: 'Configuration',
        icon: <icons.Settings />,
        subItems: [
            {
                key: 'users',
                title: 'Users',
                icon: <icons.Users />,
                link: '/dashboard/users'
            },
            {
                key: 'roles',
                title: 'Roles',
                icon: <icons.Key />,
                link: '/dashboard/roles'
            },
        ]
    },
]
export default items;