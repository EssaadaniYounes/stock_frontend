import { Empty, InvoiceCompanyInfo, InvoiceInfo, InvoiceItems } from '@/components/parts'
import { fetch } from '@/lib/fetch';
import React from 'react'
import useTranslation from 'next-translate/useTranslation';
import currency from '@/utils/format-money';
function Invoice({ data }) {
    const { company, invoice, items } = data;
    const { t } = useTranslation();
    if (company == null || invoice == null) return <Empty />
    return (
        <div className="px-6" >
            <InvoiceCompanyInfo company={company} />
            <InvoiceInfo invoice={invoice} />
            <InvoiceItems items={items} />
            <div className="flex justify-between mb-6">
                <div className="ltr:ml-5 rtl:mr-5 mt-6 w-[248px] mx-[10px]">
                    <div className="flex justify-between items-center">
                        <div>{t('common:info.items_count')} :</div>
                        <div>{items.length}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{t('common:models.pay_method')} :</div>
                        <div>{invoice.method_name}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{t('common:info.paid')} :</div>
                        <div dir='ltr'>{currency(invoice.paid_amount)}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{t('common:info.rest')} :</div>
                        <div dir='ltr'>{currency(invoice.rest_amount)}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{t('common:info.cashier')} :</div>
                        <div>{invoice.created_by}</div>

                    </div>
                </div>
                <div className="flex-1 ltr:ml-10 rtl:mr-10 border-2 border-black border-t-1">
                    <div className="border-b-2 p-1.5 text-center border-black flex justify-between items-center">
                        <div>{t('common:info.total_amount')}</div>
                        <div className="mx-8" dir="ltr">{currency(invoice.total_amount)}</div>
                    </div>

                    <div className="border-b-2 p-1.5 text-center border-black flex justify-between items-center">
                        <div>{t('common:info.tax_amount')}</div>
                        <div className="mx-8" dir="ltr">{currency(invoice.total_tax)}</div>
                    </div>
                    <div className="border-b-2 p-1.5 text-center border-black flex justify-between items-center">
                        <div>{t('common:info.total_with_tax')}</div>
                        <div className="mx-8" dir="ltr">{currency(invoice.total_with_tax)}</div>
                    </div>
                    <div className="border-b-2 p-1.5 text-center border-black flex justify-between items-center">
                        <div>{t('common:info.discount')}</div>
                        <div className="mx-8" dir="ltr">{currency(invoice.total_discount)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(ctx) {
    const query = ctx.query;
    const { data } = await fetch(`clients_invoices/report_data/${ctx.params.id}?company=${query.company}`, {
        token: ctx.req.cookies.token,
    })
    return {
        props: {
            data
        }
    }
}
export default Invoice