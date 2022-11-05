import useTranslation from 'next-translate/useTranslation';
import React, { useRef } from 'react'
import { useOnClickOutside } from '@/hooks/click-outside'
import currency from '@/utils/format-money';
import { InvoiceCompanyInfo, InvoiceInfo, InvoiceItems, ReportActions } from '@/components/parts'
function ClientInvoiceReport({ closeState, data }) {
    const { company, invoice, items } = data;
    const ref = useRef();
    useOnClickOutside(ref, () => closeState(false));
    const { t } = useTranslation();
    return (
        <div className="w-full inset-0 fixed top-0 bg-white bg-opacity-40  z-[100] ">
            <div ref={ref} className="w-[210mm] overflow-y-auto h-screen shadow-md shadow-gray-600 ltr:float-right rtl:float-left bg-white">
                <ReportActions closeState={closeState} />
                <div className="px-6" >
                    <InvoiceCompanyInfo company={company} />
                    <InvoiceInfo invoice={invoice} />
                    <InvoiceItems items={items} />
                    <div className="flex justify-between mb-6">
                        <div className="ltr:ml-5 rtl:mr-5 mt-6 w-[248px]">
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
            </div>
        </div>
    )
}

export default ClientInvoiceReport