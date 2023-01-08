import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import React from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Box } from '@/components/parts'
import { CompanyActions } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import autoLogin from '@/services'

function Update({ company, companyPermissions }) {
    const { t } = useTranslation();
    const bank_data = {
        'bank_name': company.bank_name,
        'bank_account': company.bank_account,
        'bank_swift_code': company.bank_swift_code,
        'bank_iban': company.bank_iban
    };
    const contact_data = {
        'tel': company.tel,
        'mobile': company.mobile,
        'fax': company.fax,
        'email': company.email,
        'website': company.website
    }
    const company_info = {
        'company_name': company.company_name,
        'manager': company.manager,
        'zip_code': company.zip_code,
        'city': company.city,
        'address': company.address,
        'ice': company.ice,
        'cr': company.cr,
    }
    return (
        <>
            <CurrentPageHeader title={t('common:info.company_details')} icon={icons.Company} showBack={false} component={companyPermissions.indexOf('update') != -1 && CompanyActions} />
            <div className='content mt-4 gap-x-3 gap-y-4 flex flex-wrap'>
                <Box title={t('common:info.company_info')} items={company_info} icon={icons.Info} />
                <Box title={t('common:info.contact')} items={contact_data} icon={icons.Contact} />
                <Box title={t('common:info.bank_info')} items={bank_data} icon={icons.Info} />
                {company.logo && <div className="h-[220px]">
                    <Box title={t('common:info.logo')} icon={icons.Image}>
                        <div className='p-2'>
                            <div className="relative rounded-md overflow-hidden shad h-[160px] max-h-[180px]">
                                <Image src={company.logo}
                                    alt={company.company_name}
                                    layout={'fill'}
                                    className='shadow-sm'
                                />
                            </div>
                        </div>
                    </Box>
                </div>}
            </div>
        </>
    )
}


export async function getServerSideProps(ctx) {
    const { data: company } = await fetch('companies', {
        token: ctx.req.cookies.token
    })
    const { dataUser: userData } = await autoLogin(ctx);
    let companyPermissions = JSON.parse(userData.data.permissions).companies;
    companyPermissions = companyPermissions || {}
    return {
        props: {
            company,
            companyPermissions
        }
    }
}

export default update