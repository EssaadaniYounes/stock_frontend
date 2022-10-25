import React from 'react'
import currency from '@/utils/format-money'
import useTranslation from 'next-translate/useTranslation';
function InvoiceAmountsThermal({ invoice, items }) {
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex justify-between items-center">
                <p>{t('common:info.total_amount')}:</p>
                <p dir="ltr">{currency(invoice.total_amount)}</p>
            </div>
            <div className="flex justify-between items-center">
                <p>{t('common:info.tax_amount')} :</p>
                <p dir="ltr">{currency(invoice.total_tax)}</p>
            </div>
            <div className="flex justify-between items-center">
                <p>{t('common:info.total_with_tax')}:</p>
                <p dir="ltr">{currency(invoice.total_with_tax)}</p>
            </div>
            <div className="flex justify-between items-center">
                <p>{t('common:info.discount')} :</p>
                <p dir="ltr">{currency(invoice.total_discount)}</p>
            </div>
            <div className="flex justify-between items-center">
                <p>{t('common:info.paid')} :</p>
                <p dir="ltr">{currency(invoice.paid_amount)}</p>
            </div>
            <div className="flex justify-between items-center">
                <p>{t('common:info.rest')} :</p>
                <p dir="ltr">{currency(invoice.rest_amount)}</p>
            </div>
            <div className="border-2 border-black p-2 mt-1">
                <div className="flex items-center justify-between">
                    <p>{t('common:info.items_count')} :</p>
                    <span>{items.length}</span>
                </div>
                <div className="flex items-center justify-between">
                    <p>{t('common:info.pay_method')}:</p>
                    <span>{invoice.method_name}</span>
                </div>
            </div>
        </div>
    )
}

export default InvoiceAmountsThermal