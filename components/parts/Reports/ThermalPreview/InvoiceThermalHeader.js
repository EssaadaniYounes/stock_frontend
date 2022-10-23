import React from 'react'

function InvoiceThermalHeader({ company }) {
    return (
        <div className="p-3 border-2 text-center border-gray-700 mx-auto font-semibold">
            <p>
               {company.company_name}
            </p>
            <p>
                {company.address}
            </p>
            <p>
                {company.tel}
            </p>
        </div>
    )
}

export default InvoiceThermalHeader