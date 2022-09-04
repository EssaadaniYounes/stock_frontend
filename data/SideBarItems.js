import icons from "./iconsComponents";
const items = [
    {
        id: 1,
        title: 'Home',
        icon: <icons.DashBoard />,
        subItems: [
            {
                title: 'Clients',
                icon: <icons.Clients />,
                link: '/dashboard/clients'
            },
            {
                title: 'Vendors',
                icon: <icons.Vendor />,
                link: '/dashboard/vendors'
            }
        ]
    },
    {
        id: 2,
        title: 'Stock',
        icon: <icons.Stock />,
        subItems: [
            {
                title: 'Caregories',
                icon: <icons.Categories />,
                link: '/dashboard/categories'
            },
            {
                title: 'Units',
                icon: <icons.Unit />,
                link: '/dashboard/units'
            },
            {
                title: 'Products',
                icon: <icons.Product />,
                link: '/dashboard/products'
            },
        ]
    },
    {
        id: 3,
        title: 'Configuration',
        icon: <icons.Settings />,
        subItems: [
            {
                title: 'Roles',
                icon: <icons.Key />,
                link: '/dashboard/roles'
            }
        ]
    },
]
export default items;