import useTranslation from 'next-translate/useTranslation';
import React from 'react'

function InvoiceInfo({ invoice }) {
    const { t } = useTranslation();
    return (
        <div className="my-2 px-4">
            <div className="w-full text-center mb-4">
                <h2 className="text-xl font-semibold">{t('common:info.tax_invoice')}</h2>
            </div>
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center w-full">
                    <span className="font-semibold">{t('common:info.invoice_num')} :</span>
                    <span className="flex-1 text-center">{invoice.invoice_num}</span>
                </div>
                <div className="flex items-center w-full">
                    <span className="font-semibold">{t('common:info.date')} :</span>
                    <span className="flex-1 text-center">{invoice.invoice_date}</span>
                </div>
                <div className="flex items-center w-full">
                    <span className="font-semibold">{t('common:models.client')} :</span>
                    <span className="flex-1 text-center">{invoice.client_name}</span>
                </div>
            </div>
        </div>
    )
}

export default InvoiceInfo