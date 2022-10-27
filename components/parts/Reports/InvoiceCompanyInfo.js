import Image from 'next/image'
import React from 'react'
import { InfoViewer } from '@/components/parts'
import useTranslation from 'next-translate/useTranslation';
function InvoiceCompanyInfo({ company }) {
    const { t } = useTranslation();
    return (

        <div className="flex items-center justify-between gap-x-3 px-4 border-b-2 mx-2">
            <div>
                <span className="capitalize text-2xl font-semibold">
                    {company.company_name}
                </span>
                <InfoViewer title={t('common:info.mobile')} value={company.tel} />
                <InfoViewer title={t('common:info.vat')} value={company.ice} />
                <InfoViewer title={t('common:info.cr')} value={company.cr} />
                <span className="font-semibold">{company.address}</span>
            </div>
            {
                company.logo && <div className="relative pt-4">
                    <Image src={company.logo} alt='logo' width='200' height='200' />
                </div>
            }
        </div>
    )
}

export default InvoiceCompanyInfo