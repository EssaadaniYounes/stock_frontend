import icons from "./iconsComponents";
const items = [
    {
        id: 1,
        key: "home",
        title: 'Home',
        icon: <icons.DashBoard />,
        subItems: [
            {
                key: 'cities',
                title: 'Cities',
                icon: <icons.City />,
                link: '/dashboard/cities'
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
        key: 'stock',
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
        key: 'invoices',
        title: 'Sales',
        icon: <icons.Invoice />,
        subItems: [
            {
                key: 'clients',
                title: 'Clients',
                icon: <icons.Clients />,
                link: '/dashboard/clients'
            },
            {
                key: 'clients_invoices',
                title: 'Clients invoices',
                icon: <icons.Invoices />,
                link: '/dashboard/invoices'
            },
            {
                key: 'pos',
                title: 'Pos',
                icon: <icons.Invoices />,
                link: '/dashboard/pos'
            },
            {
                key: 'clients_balance',
                title: 'Clients balance',
                icon: <icons.Money />,
                link: '/dashboard/clients/clients_ballance'
            }
        ]
    },
    {
        id: 4,
        key: 'purchases',
        title: 'Purchases',
        icon: <icons.Settings />,
        subItems: [
            {
                key: 'vendors',
                title: 'Vendors',
                icon: <icons.Vendor />,
                link: '/dashboard/vendors'
            },
            {
                key: 'suppliers_invoices',
                title: 'Supplier invoice',
                icon: <icons.Invoices />,
                link: '/dashboard/vendors/bls/'
            }
        ]
    },
    {
        id: 5,
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
            {
                key: 'pay_methods',
                title: 'Pay methods',
                icon: <icons.PayMethod />,
                link: '/dashboard/pay_methods'
            },
            {
                key: 'report_types',
                title: 'Report types',
                icon: <icons.PayMethod />,
                link: '/dashboard/report_types'
            },
        ]
    },
]
export default items;