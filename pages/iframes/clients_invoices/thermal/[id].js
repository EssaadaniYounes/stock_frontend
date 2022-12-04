import { InvoiceAmountsThermal, InvoiceItemsThermal, InvoiceThermalHeader, InvoiceThermalInfo } from '@/components/parts'
import { fetch } from '@/lib/fetch';
import React from 'react'

function invoice({ data }) {
    const { company, invoice, items } = data;
    return (
        <div className="px-4 mt-2 w-[80mm] flex flex-col gap-y-2 mb-2">
            <InvoiceThermalHeader company={company} />
            <InvoiceThermalInfo invoice={invoice} />
            <InvoiceItemsThermal items={items} />
            <InvoiceAmountsThermal items={items} invoice={invoice} />
        </div>
    )
}
export async function getServerSideProps(ctx) {
    const { data } = await fetch(`clients_invoices/items/report_data/${ctx.params.id}`, {
        token: ctx.req.cookies.token,
    })
    return {
        props: {
            data
        }
    }
}
export default invoice