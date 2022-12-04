import { CurrentPageHeader } from '@/components/layouts'
import { Toast } from '@/components/parts'
import CustomDataTable from '@/components/parts/CustomDataTable'
import { ClientInvoiceReport, ClientInvoiceReportThermal, PosActions } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { useOnClickOutside } from '@/hooks/click-outside'
import { fetch } from '@/lib/fetch'
import autoLogin, { deleteService } from '@/services'
import { useMainStore } from '@/store/MainStore'
import { can } from '@/utils/can'
import currency from '@/utils/format-money'
import getCookie from '@/utils/get-cookie'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

function index({ invoicesData, userData, clients, reportTypes }) {
    const permission = JSON.parse(userData.data.permissions).pos;
    const [showPreviewType, setShowPreviewType] = useState(false);
    const [showPrintTypes, setShowPrintTypes] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const { clientsInvoices, setClientsInvoices, setClients } = useMainStore(state => state);
    const { t } = useTranslation();
    const ref = useRef();
    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && <button onClick={() => deleteInvoice(row.id)}>
                    {<icons.Remove />}
                </button>}

                {can(permission, 'update') && < Link href={`/pos/items/${row.id}`}>
                    <a>{<icons.Update />}</a>
                </Link>}
                {
                    can(permission, 'read') && <div className=" flex items-center">
                        <button className="bg-white p-1 font-semibold border border-gray-600 border-r-0 rounded-r-none rounded-sm flex items-center gap-x-1" onClick={() => Print(row.id)}><span> {<icons.Print style={{ width: '16px', height: '16px' }} />}</span> <span> {t('common:actions.print')}</span></button>
                        <div onClick={() => handleSelectionChange(row.id)} className="p-[4px] bg-[#dfcfcf] duration-75 hover:bg-[#a39090] rounded-tr-sm border border-black rounded-br-sm shadow-sm">
                            {<icons.ArrowDownBold className='bg-gray-200' />}
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
        setSelectedInvoiceId(id);
        setShowPrintTypes(true);
    }

    const onSelectChange = async (e, id) => {
        Print(id, e.target.value)
    }
    const Print = async (id, report_type_id = null) => {
        setSelectedInvoiceId(id);
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
        const res = await deleteService('pos', id, 'Invoice');
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
                ? <ClientInvoiceReport closeState={setShowPreviewType} data={reportData} id={selectedInvoiceId} />
                : showPreviewType == 2
                    ? <ClientInvoiceReportThermal closeState={setShowPreviewType} id={selectedInvoiceId} />
                    : false
            }
            <CurrentPageHeader icon={icons.Invoices} title={'Pos'} showBack={false} component={PosActions} />
            <div className='content'>
                <Toast />
                {showPrintTypes && <div ref={ref} className="fixed top-72 left-[30%] bg-white z-20 shadow-sm shadow-gray-600 rounded-md">
                    <div onClick={() => Print(selectedInvoiceId, 1)} className="border p-2 border-black cursor-pointer duration-150 hover:shadow-sm hover:bg-gray-100 border-b-0 shadow-gray-900 ">A4</div>
                    <div onClick={() => Print(selectedInvoiceId, 2)} className="border p-2 border-black cursor-pointer duration-150 hover:shadow-sm hover:bg-gray-100 border-t-0  border-b-0 shadow-gray-900 ">Preview Thermal</div>
                    {/* <div onClick={() => Print(selectedInvoiceId, 3)} className="border p-2 border-black cursor-pointer duration-150 hover:shadow-sm hover:bg-gray-100 border-t-0 shadow-gray-900 ">Thermal</div> */}
                </div>
                }
                <div className='w-full h-full rounded-md overflow-hidden mt-4'>
                    <CustomDataTable data={clientsInvoices} columns={columns} />
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(ctx) {
    const { data: invoices } = await fetch('pos', {
        token: ctx.req.cookies.token
    })
    const { data } = await fetch('clients_invoices/items/related_items', {
        token: ctx.req.cookies.token
    })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            invoicesData: invoices,
            userData: loginResponse.dataUser,
            reportTypes: data.report_types
        }
    }
}

export default index