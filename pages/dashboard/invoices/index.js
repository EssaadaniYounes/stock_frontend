import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { ClientsInvoicesActions, SearchClientsInvoices } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import autoLogin, { deleteService } from '../../../services'
import { useMainStore } from '../../../store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '../../../utils/can'
import { Toast } from '../../../components/parts'
import useTranslation from 'next-translate/useTranslation'
import currency from '../../../utils/format-money'

function index({ invoicesData, userData, clients }) {
    const permission = JSON.parse(userData.data.permissions).clients_invoices;
    const { t } = useTranslation();
    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && <button onClick={() => deleteInvoice(row.id)}>
                    {<icons.Remove />}
                </button>}
                {can(permission, 'update') && < Link href={`/dashboard/invoices/invoice/${row.id}`}>
                    <a>{<icons.Update />}</a>
                </Link>}
                {can(permission, 'read') && < Link href={`/dashboard/invoices/invoice/products/${row.id}`}>
                    {<icons.Print />}
                </Link>}
            </div >,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: t('common:info.invoice_num'),
            selector: row => row.invoice_num,
            sortable: true,

        },
        {
            name: t('common:info.date'),
            selector: row => row.invoice_date,
            sortable: true,

        },
        {
            name: t('common:models.client'),
            selector: row => row.client_name,
            sortable: true,

        },
        {
            name: t('common:info.amount'),
            selector: row => currency(row.total_amount),
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
            <CurrentPageHeader icon={icons.Invoices} title={t('common:pages.clients_invoices')} showBack={false} component={ClientsInvoicesActions} />
            <div className='content'>
                <Toast />
                <SearchClientsInvoices allInvoices={invoicesData} />
                <div className='w-full h-full rounded-md overflow-hidden mt-4'>
                    
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