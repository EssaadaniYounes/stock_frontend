import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { ClientActions, SearchClient } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import { deleteService } from '../../../services'
import { useMainStore } from '../../../store/MainStore'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            name: "Actions",
            cell: row => <div className="flex items-center gap-2">
                <button onClick={() => deleteClient(row.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 duration-100 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                < Link href={`/dashboard/clients/client/${row.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer duration-100 hover:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </Link>
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
        deleteService('clients', id);
        setClients(clients.filter(client => client.id !== id));
        toast.success('Client deleted Successfully !', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    return (
        <div className=''>
            <ToastContainer position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                transition={Flip}
                pauseOnHover />
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