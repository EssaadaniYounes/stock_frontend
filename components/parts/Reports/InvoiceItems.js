import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import currency from '../../../utils/format-money';

function InvoiceItems({ items }) {
    const { t } = useTranslation();
    return (
        <table className="border-black border w-full">
            <thead>
                <tr>
                    <th className="border border-black p-1.5">N</th>
                    <th className="border border-black p-1.5" width="20%">{t('common:info.designation')}</th>
                    <th className="border border-black p-1.5">{t('common:models.unit')}</th>
                    <th className="border border-black p-1.5">{t('common:info.qte')}</th>
                    <th className="border border-black p-1.5">{t('common:info.price')}</th>
                    <th className="border border-black p-1.5">{t('common:info.discount')}</th>
                    <th className="border border-black p-1.5">{t('common:info.amount')}</th>
                    <th className="border border-black p-1.5">{t('common:info.tax_amount')}</th>
                    <th className="border border-black p-1.5">{t('common:info.total_amount')}</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) =>
                    <tr className="w-full border border-black" key={item.id}>
                        <td className="border border-black text-center">{index + 1}</td>
                        <td className="ltr:border-r rtl:border-l text-center border-black p-1.5" width={'25%'}>{item.name}</td>
                        <td className="ltr:border-r rtl:border-l text-center border-black p-1.5">{item.unit_name}</td>
                        <td className="ltr:border-r rtl:border-l text-center border-black p-1.5">{item.quantity}</td>
                        <td className="ltr:border-r rtl:border-l text-center border-black p-1.5"  dir='ltr'>{currency(item.price)}</td>
                        <td className="ltr:border-r rtl:border-l text-center border-black p-1.5"  dir='ltr'>{item.discount > 0 ? currency(item.discount) : '-'}</td>
                        <td className="ltr:border-r rtl:border-l text-center border-black p-1.5"  dir='ltr'>{currency(item.amount)}</td>
                        <td className="ltr:border-r rtl:border-l text-center border-black p-1.5"  dir='ltr'>{currency(item.tax_amount)}</td>
                        <td className="text-center p-1.5" dir='ltr'>{currency(item.amount_total)}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default InvoiceItems