import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { ClientActions, SearchClient } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import autoLogin, { deleteService } from '../../../services'
import { useMainStore } from '../../../store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '../../../utils/can'
import { Toast } from '../../../components/parts'

function index({ clientsData, userData }) {
    const permission = JSON.parse(userData.data.permissions).clients;
    const columns = [
        {
            name: "#",
            cell: (row, index) => index + 1,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Actions",
            cell: row => <div className="flex items-center gap-x-2">
                {can(permission, 'delete') && <button onClick={() => deleteClient(row.id)}>
                    {<icons.Remove />}
                </button>}
                {can(permission, 'update') && < Link href={`/dashboard/clients/client/${row.id}`}>
                    <div className="text-orange-400">
                        {<icons.Update />}
                    </div>
                </Link>}
            </div >,
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

    const deleteClient = async (id) => {
        const res = await deleteService('clients', id);
        if (res) {
            setClients(clients.filter(client => client.id !== id));
            toast.success(res.message, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    return (
        <div>
            <CurrentPageHeader icon={icons.Clients} title="Clients" component={ClientActions} />

            <div className='content'>
                <Toast />
                <SearchClient allClients={clientsData} />
                <div className='w-full h-full rounded-md overflow-hidden px-4 mt-4'>
                    <div className='w-full h-14 font-bold text-gray-600 py-3 pl-2 ' >
                        Clients list
                    </div>
                    <CustomDataTable data={clients} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const response = await fetch('clients', {
        token: ctx.req.cookies.token
    })

    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            clientsData: response.data,
            userData: loginResponse.dataUser
        }
    }
}

export default index