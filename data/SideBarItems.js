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
            }
        ]
    },
    {
        id: 2,
        title: 'Configuration',
        icon: <icons.Settings />,
        subItems: [
            {
                title: 'Roles',
                icon: <icons.Key />,
                link: '/dashboard/roles'
            }
        ]
    }
]
export default items;