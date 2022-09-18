import Image from 'next/image'
import React from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Box } from '../../../components/parts'
import { CompanyActions } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import autoLogin from '../../../services'

function update({ company, companyPermissions }) {
    const bank_data = {
        'bank name': company.bank_name,
        'bank account': company.bank_account,
        'bank swift code': company.bank_swift_code,
        'bank iban': company.bank_iban
    };
    const contact_data = {
        tel: company.tel,
        mobile: company.mobile,
        fax: company.fax,
        email: company.email,
        website: company.website
    }
    const company_info = {
        'Company Name': company.company_name,
        'Manager': company.manager,
        'zip code': company.zip_code,
        'city': company.city,
        'address': company.address,
    }
    return (
        <>
            <CurrentPageHeader title="Company details" icon={icons.Company} showBack={false} component={companyPermissions.indexOf('update') != -1 && CompanyActions} />
            <div className='content mt-4 gap-x-3 gap-y-4 flex flex-wrap'>
                <Box title="Company info" items={company_info} icon={icons.Info} />
                <Box title="Contact" items={contact_data} icon={icons.Contact} />
                <Box title="Bank information" items={bank_data} icon={icons.Info} />
                <div className="h-[220px]">
                    <Box title="Logo" icon={icons.Image}>
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
                </div>
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