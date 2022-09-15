import React, { useEffect, useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
const classes = {
    label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300',
    input: 'bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    th: 'py-3 px-3',
    td: 'p-[2px] ',
    textarea: 'block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

}
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '../../../utils/toast-update';
import { useRouter } from 'next/router';
import { useMainStore } from '../../../store/MainStore';
import { Toast } from '../../parts';
function Invoice({ invoice = null, invoiceProducts = null }) {
    const { products, clients, clientsInvoices, config } = useMainStore(state => state);
    const router = useRouter();
    const [data, setData] = useState(invoice ? invoice : {
        client_id: '',
        invoice_num: 1,
        notes: '',
        invoice_date: '',
        discount: '',
        total: '',
        created_by: 'nnnn'
    });
    const [invoiceItems, setInvoiceItems] = useState(invoiceProducts ? invoiceProducts : []);

    const [selectedProductId, setSelectedProductId] = useState(0);
    //get invoice num
    useEffect(() => {
        if (invoice) {
            setData({ ...data, invoice_num: invoice.invoice_num })
        }
        else {
            const lastInvoice = clientsInvoices[clientsInvoices.length - 1];
            lastInvoice && setData({ ...data, invoice_num: +lastInvoice.invoice_num + 1 })

        }
    }, [clientsInvoices]);
    //update total value
    useEffect(() => {
        const totalAmount = invoiceItems.reduce((prev, current) => prev + current.amount, 0);
        setData(prev => ({ ...prev, total: totalAmount - prev.discount }));
    }, [invoiceItems, data.discount]);

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSelectionChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const product = products.find(p => p[name] == value);
        const Obj = {
            name: product.name,
            unit: product.unit_name,
            barcode: product.barcode,
            product_id: product.id,
            price: 0,
            quantity: 0,
            amount: 0,
            tax_amount: 0,
            amount_total: 0
        }
        setInvoiceItems([Obj, ...invoiceItems]);
        setSelectedProductId(0);
    }
    const onProductChange = (e, index) => {
        const name = e.target.name;
        const value = e.target.value;
        const newProducts = invoiceItems.map((p, i) => {
            if (index == i) {
                if (name != "price" && name != "quantity") {
                    return { ...p, [name]: value };
                }
                const amountValue = name == "price"
                    ? +value * +p.quantity
                    : +value * +p.price;
                const taxAmount = amountValue * (parseInt(config.default_tax) / 100);
                const amountTotal = amountValue + taxAmount;
                return { ...p, [name]: value, amount: amountValue, tax_amount: taxAmount, amount_total: amountTotal };
            }
            return p;
        })
        setInvoiceItems(newProducts)
        setSelectedProductId(0);

    }
    const handleBarcodeSearch = (e) => {
        if (e.code == 'Enter') {
            const product = products.find(p => p.barcode == e.target.value);
            if (product) {
                return handleSelectionChange(e);
            }
            alert("There's no product with this barcode!");
        }
    }

    const removeInvoiceItem = (index) => {
        const items = invoiceItems.filter((item, i) => i != index);
        setInvoiceItems(items);
    }
    const handleOnSubmit = async () => {

        const id = toast.loading("Please wait...")
        if (invoice) {
            const res = await updateService('clients_invoices', invoice.id, { invoice: data, invoice_items: invoiceItems });
            ToastDone("Invoice updated successfully", id, res);

        }
        else {
            const res = await addService('clients_invoices', { invoice: data, invoice_items: invoiceItems });
            ToastDone("Client added successfully", id, res);
        }
        setTimeout(() => {
            router.push('/dashboard/clients/invoices');
        }, 1500);
    }

    return (
        <div className="flex flex-col mr-4">
            <Toast />
            <div className="search-box mb-3">
                <div className="search-header">Invoice Info</div>
                <div className="p-4 w-full">
                    <div className='w-full flex flex-wrap justify-between'>
                        <div className="relative z-0 mb-6 w-full md:w-[32%]  group">
                            <label className={classes.label}>Invoice number</label>
                            <input type="text"
                                name='invoice_num'
                                readOnly
                                className={classes.input}
                                value={data.invoice_num}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[32%]  group">
                            <label className={classes.label}>Date</label>
                            <input type="date"
                                name='invoice_date'
                                className={classes.input}
                                value={data.invoice_date}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[32%]  group">
                            <label className={classes.label}>Client</label>
                            <select
                                name='client_id'
                                readOnly
                                className={classes.input}
                                value={data.client_id}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " >
                                {clients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                            </select>
                        </div>

                    </div>
                    <div className='w-full flex flex-wrap justify-between'>
                        <div className="relative z-0 mb-6 w-full md:w-[55%]  group">
                            <label className={classes.label}>Barcode</label>
                            <input type="text"
                                name='barcode'
                                className={classes.input}
                                onKeyDown={(e) => handleBarcodeSearch(e)}
                                placeholder=" " />
                        </div>

                        <div className="relative z-0 mb-6 w-full md:w-[44%]  group">
                            <label className={classes.label}>Product</label>
                            <select className={classes.input} name='id' value={selectedProductId} onChange={(e) => handleSelectionChange(e)}>
                                <option value='0' disabled >Select a product</option>
                                {products.map((p, index) => <option key={index} value={p.id}>{p.barcode + ' / ' + p.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" search-box  ">
                <div className="search-header">
                    Invoice items
                </div>
                <div className="w-full overflow-auto relative max-h-64">
                    <table className="w-full text-sm text-left border text-gray-500 dark:text-gray-400" style={{ 'width': "100%" }}>
                        <thead className="text-[10px] md:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 sticky top-0 dark:text-gray-400">
                            <tr>
                                <th className={classes.th + 'max-xss'}>#</th>
                                <th className={classes.th + 'max-md'}>Barcode</th>
                                <th className={classes.th + 'max-lg'}>Name</th>
                                <th className={classes.th + 'max-xs'}>Unit</th>
                                <th className={classes.th + 'max-xs'}>Quantity</th>
                                <th className={classes.th + 'max-xs'}>Price</th>
                                <th className={classes.th + 'max-xs'}>Amount</th>
                                <th className={classes.th + 'max-xs'}>Tax amount</th>
                                <th className={classes.th + 'max-xs'}>Amount total</th>
                                <th className={classes.th + 'max-xss'}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems.map((product, index) =>
                                <tr key={index} className="bg-white even:bg-gray-200">
                                    <td className={classes.td + 'xss'} >
                                        {invoiceItems.length - index}
                                    </td>
                                    <td className={classes.td + 'md'}>
                                        <input type="text" className={classes.input + ' rounded-none bg-gray-100'} name="barcode" value={products.find((p, i) => p.id == product.product_id).barcode} readOnly />
                                    </td>
                                    <td className={classes.td + 'lg'}>
                                        <input type="text" className={classes.input + ' rounded-none'} name="name" value={product.name} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={classes.td + 'xs'}>
                                        <input type="text" className={classes.input + ' rounded-none bg-gray-100'} name="unit" value={products.find((p, i) => p.id == product.product_id).unit_name} readOnly />
                                    </td>
                                    <td className={classes.td + 'xs'}>
                                        <input type="number" className={classes.input + '  text-center rounded-none'} name="quantity" value={product.quantity} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={classes.td + 'xs'}>
                                        <input type="number" className={classes.input + '  text-center rounded-none'} name="price" value={product.price} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={classes.td + 'xs'}>
                                        <input type="number" className={classes.input + '  text-right rounded-none bg-gray-100'} name="amount" readOnly value={product.amount} />
                                    </td>
                                    <td className={classes.td + 'xs'}>
                                        <input type="text" className={classes.input + '  text-center rounded-none bg-gray-100'} readOnly value={product.tax_amount} />
                                    </td>
                                    <td className={classes.td + 'xs'}>
                                        <input type="text" className={classes.input + '  text-right rounded-none bg-gray-100'} readOnly value={product.amount_total} />
                                    </td>

                                    <td className={classes.td + 'xss'} onClick={() => removeInvoiceItem(index)}>
                                        {<icons.Delete />}
                                    </td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-full flex flex-wrap justify-between pt-6 mt-[20px] '>

                <div className="relative mt-2 z-0 mb-6 w-full flex flex-wrap gap-x-4  group">
                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>Discount</label>
                        <input type="text"
                            name='discount'
                            className={classes.input}
                            value={data.discount}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>
                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>Total</label>
                        <input type="text"
                            name='total'
                            className={classes.input}
                            value={data.total}
                            readOnly
                            placeholder=" " />
                    </div>
                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>Total with Discount</label>
                        <input type="text"
                            name='total'
                            className={classes.input}
                            value={+data.total + +data.discount}
                            readOnly
                            placeholder=" " />
                    </div>
                    
                </div>
                <div className="relative z-0 mb-6 w-full  group">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Notes</label>
                    <textarea id="message" rows="4" value={data.notes} className={classes.textarea} name="notes" onChange={e => handleOnChange(e)} placeholder="Notes"></textarea>
                </div>
            </div>
            <button onClick={() => handleOnSubmit()} className={`${!invoice ? 'button-save' : 'yellow-button'} mt-10 flex items-center mx-auto`}>
                {<icons.Save />}
                <div className='ml-1'>Save</div>
            </button>
        </div >
    )
}

export default Invoice