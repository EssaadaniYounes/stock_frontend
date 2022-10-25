import React from 'react'
import currency from '@/utils/format-money'

function InvoiceItemsThermal({ items }) {
    return (
        <table className="border-b-2 border-dashed pb-2 border-gray-700">
            <thead className="border-2 border-gray-700 font-bold">
                <tr className=" flex justify-between items-center">
                    <th>Description</th>
                    <th>Qty * Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => <tr key={item.id} className="flex items-center text-center justify-between text-[14px] font-semibold">
                    <td>{item.name}</td>
                    <td className="text-center">{item.quantity} * {currency(item.price)}</td>
                    <td dir="ltr">{currency(item.amount_total)}</td>
                </tr>)}
            </tbody>
        </table >
    )
}

export default InvoiceItemsThermal