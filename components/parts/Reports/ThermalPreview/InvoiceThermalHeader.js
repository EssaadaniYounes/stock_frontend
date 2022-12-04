import Image from 'next/image'
import React from 'react'

function InvoiceThermalHeader({ company }) {
    return (
        <div className="relative flex flex-col items-center">
            <div className="p-3 border-2 text-center border-gray-700 mx-auto">
                <p className="font-semibold uppercase flex flex-col">
                    {company?.logo ? <Image src={company.logo} alt="Logo" width={100} height={100} /> : ''}
                    {company.company_name}
                </p>
                <p className="text-xs">
                    {company.address}
                </p>
                <p className="text-xs">
                    {company.tel}
                </p>
            </div>
        </div >
    )
}

export default InvoiceThermalHeader