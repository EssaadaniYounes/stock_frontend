import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { ClientActions, SearchClient } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import { useMainStore } from '../../../store/MainStore'

function index({ clientsData }) {

    const columns = [
        {
            name: "#",
            cell: (row, index) => index + 1,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Full name',
            selector: row => row.full_name,
            sortable: true,

        },
        {
            name: 'Street',
            selector: row => row.street,
            sortable: true,

        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true,

        },
        {
            name: 'Phone',
            selector: row => row.tel,
            sortable: true,

        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,

        }

    ];

    const { clients, setClients } = useMainStore(state => state);

    useEffect(() => {
        if (!clients.length) {
            setClients(clientsData);
        }
    }, []);

    return (
        <div className=''>
            <CurrentPageHeader icon={icons.Clients} title="Clients" component={ClientActions} />
            <SearchClient />
            <div className='w-full h-full rounded-md overflow-hidden px-4 mt-4'>
                <div className='w-full h-14 font-bold text-gray-600 py-3 pl-2 ' >
                    Clients list
                </div>
                <CustomDataTable data={clients} columns={columns} />
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const response = await fetch('clients', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            clientsData: response.data
        }
    }
}

export default index