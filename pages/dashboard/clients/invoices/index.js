import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import CustomDataTable from '../../../../components/parts/CustomDataTable'
import { ClientActions, SearchClient } from '../../../../components/ui'
import icons from '../../../../data/iconsComponents'
import { fetch } from '../../../../lib/fetch'
import autoLogin, { deleteService } from '../../../../services'
import { useMainStore } from '../../../../store/MainStore'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '../../../../utils/can'

function index({ invoicesData, userData }) {
    const permission = JSON.parse(userData.data.permissions).invoices;
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
                {can(permission, 'delete') && <button onClick={() => deleteInvoice(row.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 duration-100 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>}
                {can(permission, 'update') && < Link href={`/dashboard/clients/invoices/invoice/${row.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer duration-100 hover:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </Link>}
                {can(permission, 'read') && < Link href={`/dashboard/clients/invoices/invoice/products/${row.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </Link>}
            </div >,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Invoice number',
            selector: row => row.invoice_num,
            sortable: true,

        },
        {
            name: 'Date',
            selector: row => row.invoice_date,
            sortable: true,

        },
        {
            name: 'Client',
            selector: row => row.client_name,
            sortable: true,

        },
        {
            name: 'Amount',
            selector: row => row.total,
            sortable: true,

        },
        {
            name: 'Notes',
            selector: row => row.notes,
            sortable: true,
        }
    ];

    const { clientsInvoices, setClientsInvoices } = useMainStore(state => state);

    useEffect(() => {
        setClientsInvoices(invoicesData);
    }, []);

    const deleteInvoice = async (id) => {
        const res = await deleteService('clients_invoices', id, 'Invoice');
        if (res.success) {
            setClientsInvoices(clientsInvoices.filter(i => i.id !== id));
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
            <CurrentPageHeader icon={icons.Invoices} title="Clients invoices" component={ClientActions} />
            <div className='w-full h-full rounded-md overflow-hidden px-4 mt-4'>
                <div className='w-full h-14 font-bold text-gray-600 py-3 pl-2 ' >
                    Invoices list
                </div>
                <CustomDataTable data={clientsInvoices} columns={columns} />
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const response = await fetch('clients_invoices', {
        token: ctx.req.cookies.token
    })

    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            invoicesData: response.data,
            userData: loginResponse.dataUser
        }
    }
}

export default index