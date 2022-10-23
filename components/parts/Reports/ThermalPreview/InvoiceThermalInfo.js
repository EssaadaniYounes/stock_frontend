import useTranslation from 'next-translate/useTranslation';
import React from 'react'

function InvoiceThermalInfo({ invoice }) {
    const { t } = useTranslation();
    return (
        <div>
            <h1 className="text-center uppercase font-semibold text-lg mb-1">
                {t('common:info.tax_invoice')}
            </h1>
            <div>
                <div className="flex items-center gap-x-3">
                    <p className="font-semibold min-w-[70px]">{t('common:info.invoice_num')} :</p>
                    <p>{invoice.invoice_num}</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <p className="font-semibold min-w-[70px]">{t('common:info.date')} :</p>
                    <p dir="ltr">{invoice.invoice_date}</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <p className="font-semibold min-w-[70px]">{t('common:info.cashier')} :</p>
                    <p>{invoice.created_by}</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <p className="font-semibold min-w-[70px]">{t('common:models.client')} :</p>
                    <p>{invoice.client_name}</p>
                </div>
                <div className="flex items-start gap-x-3">
                    <p className="font-semibold min-w-[70px]">{t('common:info.address')} :</p>
                    <p className="text-[14px] font-semibold mt-1">{invoice.client_address}</p>
                </div>
            </div>
        </div>
    )
}

export default InvoiceThermalInfo