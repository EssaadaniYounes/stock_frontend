import React, { useEffect, useRef, useState } from "react";
import { Loader } from ".";
import { fetch } from '../../lib/fetch'
import { useAuthStore } from "../../store/authStore";
import calcTotalAmount, { calcLastMonthAmount } from "../../utils/calc";
import { getDate, itemsInMonth } from "../../utils/dates";
import currency from '../../utils/format-money'
const Tabs = ({ items }) => {
    const [openTab, setOpenTab] = useState(items[0].id);
    const { user } = useAuthStore(state => state);
    const [clients, setClients] = useState([]);
    const [hiddenClients, setHiddenClients] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [invoiceItems, setInvoiceItems] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState(items[0].id);
    let paidAmount = 0;
    useEffect(() => {
        fetchInvoice(selectedClientId);
    }, []);
    useEffect(() => {
        setClients(items.slice(0, 2));
        setHiddenClients(items.slice(2, items.length));
        setSelectedClientId(items[0].id);
    }, [items]);
    const replaceClients = (newClientId, oldClientId) => {
        const newClient = hiddenClients.find(cl => cl.id == newClientId);
        const newHiddenClients = hiddenClients.filter(cl => cl.id != newClientId);
        const oldClient = clients.find(cl => cl.id == oldClientId);
        const newClients = clients.filter(cl => cl.id != oldClientId);

        setClients([newClient, ...newClients]);
        setHiddenClients([...newHiddenClients, oldClient]);
        setSelectedClientId(newClient.id);

    }
    async function fetchInvoice(id) {
        setIsFetching(true);
        setSelectedClientId(id);
        const res = await fetch(`clients/balance/${id}`, { token: user.token });
        setInvoiceItems(itemsInMonth(res.data, res.invoices));
        setOpenTab(id);
        setIsFetching(false);
    }
    return (
        <>
            <div className="">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 mx-2 px-5 pb-4 flex-row"
                        role="tablist"
                    >
                        {clients.map((item, index) =>
                        (index < 4 && <li key={item.id} className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-md rounded block leading-normal " +
                                    (openTab == item.id
                                        ? "text-white bg-blue-600"
                                        : "text-blue-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    fetchInvoice(item.id);
                                }}
                                data-toggle="tab"
                                href={`#link${index}}`}
                                role="tablist"
                            >
                                {item.full_name}
                            </a>
                        </li>
                        )
                        )}
                        {hiddenClients.length > 0 &&
                            <li>
                                <select className="input" onChange={(e) => { replaceClients(e.target.value, selectedClientId), fetchInvoice(e.target.value), e.target.value = 0 }}>
                                    <option value="0" disabled>Other clients</option>
                                    {hiddenClients.map(client => <option key={client.id} value={client.id}>{client.full_name}</option>)}
                                </select>
                            </li>
                        }
                    </ul>
                    {isFetching && <Loader />}
                    {!isFetching &&
                        <table className="pos-table w-full text-center">
                            <caption className="text-center py-3 bg-gray-200 font-semibold">{items.find(i => i.id == selectedClientId)?.full_name}</caption>
                            <thead>
                                <tr>
                                    <th id="pp">Date</th>
                                    <th>Designation</th>
                                    <th>Qte</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>S.amount</th>
                                    <th>N° Bl</th>
                                    <th>Paid</th>
                                    <th>Method</th>
                                    <th>Dus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceItems && Object.keys(invoiceItems).map((key, i) =>
                                    Object.keys(invoiceItems[key]).map((dayKey, j) =>
                                        invoiceItems[key][dayKey].map((invoiceItem, index) => {
                                            if (invoiceItem.paid_amount) {
                                                paidAmount += invoiceItem.paid_amount;
                                            }
                                            return <tr key={invoiceItem.id}>
                                                {index == 0
                                                    ? <td rowSpan={invoiceItems[key][dayKey].length}>{getDate(invoiceItem.dt)}</td>
                                                    : false
                                                }
                                                <td>{invoiceItem.name}</td>
                                                <td>{invoiceItem.quantity}</td>
                                                <td>{currency(invoiceItem.price)}</td>
                                                <td>{currency(invoiceItem.amount)}</td>
                                                {index == 0
                                                    ? <td rowSpan={invoiceItems[key][dayKey].length}>{currency(calcTotalAmount(invoiceItems[key][dayKey], 'amount'))}</td>
                                                    : false
                                                }
                                                <td>{invoiceItem.invoice_num}</td>
                                                {index == 0
                                                    ? <td rowSpan={invoiceItems[key][dayKey].length}>
                                                        {currency(invoiceItem.paid_amount)}
                                                    </td>
                                                    : false
                                                }
                                                {index == 0
                                                    ? <td rowSpan={invoiceItems[key][dayKey].length}>..</td>
                                                    : false
                                                }
                                                {

                                                    index == 0
                                                        ? <td rowSpan={invoiceItems[key][dayKey].length}>
                                                            {currency(
                                                                calcLastMonthAmount(invoiceItems, invoiceItem,paidAmount)
                                                            )}
                                                        </td>
                                                        : false
                                                }
                                            </tr>
                                        })
                                    )
                                )}
                            </tbody>

                        </table>
                    }
                </div>
            </div>
        </>
    );
};

export default Tabs;