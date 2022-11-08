import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import CustomDataTable from '@/components/parts/CustomDataTable'
import { ClientsInvoicesActions, SearchClientsInvoices } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import autoLogin, { deleteService } from '@/services'
import { useMainStore } from '@/store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '@/utils/can'
import { Toast } from '@/components/parts'
import useTranslation from 'next-translate/useTranslation'
import currency from '@/utils/format-money'
import { ClientInvoiceReport, ClientInvoiceReportThermal } from '@/components/ui'
import getCookie from '@/utils/get-cookie'
import { useOnClickOutside } from '@/hooks/click-outside'

function index({ invoicesData, userData, clients, reportTypes }) {
    const permission = JSON.parse(userData.data.permissions).clients_invoices;
    const [showPreviewType, setShowPreviewType] = useState(false);
    const [showPrintTypes, setShowPrintTypes] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [reportData, setReportData] = useState(null);
    const ref = useRef();
    const { clientsInvoices, setClientsInvoices, setClients } = useMainStore(state => state);
    const { t } = useTranslation();
    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && row.init == 0 && <button onClick={() => deleteInvoice(row.id)}>
                    {<icons.Remove />}
                </button>}

                {can(permission, 'update') && < Link href={`/dashboard/invoices/invoice/${row.id}`}>
                    <a>{<icons.Update />}</a>
                </Link>}
                {
                    can(permission, 'read') && <div className=" flex items-center">
                        <button className="bg-gray-100 p-2 px-3 font-semibold border border-gray-600 rounded-sm" onClick={() => Print(row.id)}>{t('common:actions.print')}</button>
                        <div onClick={() => handleSelectionChange(row.id)}>
                            {<icons.ArrowDown />}
                        </div>
                    </div>
                }
            </div >,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: "300px"
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

        },
        {
            name: t('common:models.user'),
            selector: row => row.user,
            sortable: true,

        }
    ];

    useOnClickOutside(ref, () => setShowPrintTypes(false));
    useEffect(() => {
        setClientsInvoices(invoicesData);
        setClients(clients)
    }, []);


    const handleSelectionChange = (id) => {
        console.log(id);
        setSelectedInvoiceId(id);
        setShowPrintTypes(true);
    }

    const onSelectChange = async (e, id) => {
        Print(id, e.target.value)
    }
    const Print = async (id, report_type_id = null) => {
        console.log(report_type_id)
        const { data } = await fetch(`clients_invoices/items/report_data/${id}`, {
            token: getCookie('token'),
        })
        setReportData(data);
        if (!report_type_id) {
            setShowPreviewType(reportTypes.find(t => t.is_default == 1).id)
        }
        else {
            setShowPreviewType(report_type_id);
        }
    }

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
        <div className="relative">
            {showPreviewType && showPreviewType == 1
                ? <ClientInvoiceReport closeState={setShowPreviewType} data={reportData} />
                : showPreviewType == 2
                    ? <ClientInvoiceReportThermal closeState={setShowPreviewType} data={reportData} />
                    : false
            }
            <CurrentPageHeader icon={icons.Invoices} title={t('common:pages.clients_invoices')} showBack={false} component={ClientsInvoicesActions} />
            <div className='content relative'>
                <Toast />
                {showPrintTypes && <div ref={ref} className="fixed top-72 left-[30%] bg-gray-200 z-20 shadow-sm shadow-gray-600 rounded-md">
                    <div onClick={() => Print(selectedInvoiceId, 1)} className="border p-2 border-black my-2 mx-3 rounded-md cursor-pointer duration-150 hover:bg-gray-300 hover:shadow-sm shadow-gray-900 ">A4</div>
                    <div onClick={() => Print(selectedInvoiceId, 2)} className="border p-2 border-black my-2 mx-3 rounded-md cursor-pointer duration-150 hover:bg-gray-300 hover:shadow-sm shadow-gray-900 ">Preview Thermal</div>
                </div>
                }
                <SearchClientsInvoices allInvoices={invoicesData} />
                <div className='w-full h-full rounded-md overflow-hidden mt-4'>

                    <CustomDataTable data={clientsInvoices} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { data: invoices } = await fetch('clients_invoices', {
        token: ctx.req.cookies.token
    })
    const { data } = await fetch('clients_invoices/items/related_items', {
        token: ctx.req.cookies.token
    })
    data.clients.unshift({ value: 0, label: 'All' })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            invoicesData: invoices,
            userData: loginResponse.dataUser,
            clients: data.clients,
            reportTypes: data.report_types
        }
    }
}

export default index