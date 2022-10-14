import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import CustomDataTable from '../../../../components/parts/CustomDataTable'
import { ClientsInvoicesActions, SearchClientsInvoices, SearchVendorsInvoices, VendorsInvoicesActions } from '../../../../components/ui'
import icons from '../../../../data/iconsComponents'
import { fetch } from '../../../../lib/fetch'
import autoLogin, { deleteService } from '../../../../services'
import { useMainStore } from '../../../../store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '../../../../utils/can'
import { Toast } from '../../../../components/parts'
import useTranslation from 'next-translate/useTranslation'
import currency from '../../../../utils/format-money'

function index({ vendorsInvoicesData, vendorsData, userData }) {
    const permission = JSON.parse(userData.data.permissions).suppliers_invoices;
    const { t } = useTranslation();
    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && <button onClick={() => deleteInvoice(row.id)}>
                    {<icons.Remove />}
                </button>}
                {can(permission, 'update') && <Link href={`/dashboard/vendors/bls/bl/${row.id}`}>
                    <a>{<icons.Update />}</a>
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
            name: t('common:models.vendor'),
            selector: row => row.vendor_name,
            sortable: true,

        },
        {
            name: t('common:info.amount'),
            selector: row => currency(row.total_amount),
            sortable: true,
        },
        {
            name: t('common:models.user'),
            selector: row => row.user,
            sortable: true,
        }
    ];

    const { vendorsInvoices, setVendorsInvoices, setVendors } = useMainStore(state => state);

    useEffect(() => {
        setVendorsInvoices(vendorsInvoicesData);
        setVendors(vendorsData)
    }, []);

    const deleteInvoice = async (id) => {
        const res = await deleteService('vendor_invoices', id, 'Invoice');
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
            <CurrentPageHeader icon={icons.Invoices} title={t('common:pages.suppliers_invoices')} showBack={false} component={VendorsInvoicesActions} />
            <div className='content'>
                <Toast />
                <SearchVendorsInvoices allInvoices={vendorsInvoicesData} />
                <div className='w-full h-full rounded-md overflow-hidden mt-4'>
                    <CustomDataTable data={vendorsInvoices} columns={columns} />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { data } = await fetch('vendors_invoices', {
        token: ctx.req.cookies.token
    })

    data.vendors.unshift({ value: 0, label: 'All' })

    const { dataUser: userData } = await autoLogin(ctx);
    return {
        props: {
            vendorsInvoicesData: data.bls,
            vendorsData: data.vendors,
            userData
        }
    }
}

export default index