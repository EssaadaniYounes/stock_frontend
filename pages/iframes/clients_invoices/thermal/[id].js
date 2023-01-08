import { Empty, InvoiceAmountsThermal, InvoiceItemsThermal, InvoiceThermalHeader, InvoiceThermalInfo } from '@/components/parts'
import { fetch } from '@/lib/fetch';
import React from 'react'

function invoice({ data }) {
    const { company, invoice, items } = data;
    if (company == null || invoice == null) return <Empty />
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
    const query = ctx.query;
    const { data } = await fetch(`clients_invoices/report_data/${ctx.params.id}?company=${query.company}`, {
        token: ctx.req.cookies.token,
    })
    return {
        props: {
            data
        }
    }
}
export default invoice