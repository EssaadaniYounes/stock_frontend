import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import CustomDataTable from '../../../../components/parts/CustomDataTable'
import { ClientsInvoicesActions, SearchClientsInvoices } from '../../../../components/ui'
import icons from '../../../../data/iconsComponents'
import { fetch } from '../../../../lib/fetch'
import autoLogin, { deleteService } from '../../../../services'
import { useMainStore } from '../../../../store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '../../../../utils/can'
import { Toast } from '../../../../components/parts'

function index({ invoicesData, userData, clients }) {
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
                    {<icons.Remove />}
                </button>}
                {can(permission, 'update') && < Link href={`/dashboard/clients/invoices/invoice/${row.id}`}>
                    {<icons.Update />}
                </Link>}
                {can(permission, 'read') && < Link href={`/dashboard/clients/invoices/invoice/products/${row.id}`}>
                    {<icons.Print />}
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

    const { clientsInvoices, setClientsInvoices, setClients } = useMainStore(state => state);

    useEffect(() => {
        setClientsInvoices(invoicesData);
        setClients(clients)
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
        <>
            <CurrentPageHeader icon={icons.Invoices} title="Clients invoices" component={ClientsInvoicesActions} />
            <div className='px-4'>
                <Toast />
                <SearchClientsInvoices allInvoices={invoicesData} />
                <div className='w-full h-full rounded-md overflow-hidden mt-4'>
                    <div className='w-full h-14 font-bold text-gray-600 py-3 pl-2 ' >
                        Invoices list
                    </div>
                    <CustomDataTable data={clientsInvoices} columns={columns} />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const response = await fetch('clients_invoices', {
        token: ctx.req.cookies.token
    })
    const clientsResponse = await fetch('clients', {
        token: ctx.req.cookies.token
    })

    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            invoicesData: response.data,
            userData: loginResponse.dataUser,
            clients: clientsResponse.data
        }
    }
}

export default index