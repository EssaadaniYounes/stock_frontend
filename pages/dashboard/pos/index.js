import { CurrentPageHeader } from '@/components/layouts'
import { Toast } from '@/components/parts'
import CustomDataTable from '@/components/parts/CustomDataTable'
import { PosActions } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import autoLogin, { deleteService } from '@/services'
import { useMainStore } from '@/store/MainStore'
import { can } from '@/utils/can'
import currency from '@/utils/format-money'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function index({ invoicesData, userData, clients }) {
    const permission = JSON.parse(userData.data.permissions).pos;
    const [showPreviewType, setShowPreviewType] = useState(false);
    const [reportData, setReportData] = useState(null);
    const { clientsInvoices, setClientsInvoices, setClients } = useMainStore(state => state);
    const { t } = useTranslation();
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
                        <button className="bg-gray-100 p-2 px-3 font-semibold border border-gray-600 rounded-sm" onClick={() => Print(row.id)}>{t('common:actions.print')}</button>
                        <select className="bg-gray-50 outline-none p-2" onChange={(e) => onSelectChange(e, row.id)}>
                            <option value="0">
                            </option>
                            <option value="1">
                                {t('common:actions.print_a4')}
                            </option>
                            <option value="2">
                                {t('common:actions.preview_thermal')}
                            </option>
                        </select>
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

    useEffect(() => {
        setClientsInvoices(invoicesData);
        setClients(clients)
    }, []);


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
            <CurrentPageHeader icon={icons.Invoices} title={'Pos'} showBack={false} component={PosActions} />
            <div className='content'>
                <Toast />
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