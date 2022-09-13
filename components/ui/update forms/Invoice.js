import React, { useEffect, useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
const classes = {
    label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300',
    input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    th: 'py-3 px-6',
    td: 'py-4 px-6',
    textarea: 'block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

}
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '../../../utils/toast-update';
import { useRouter } from 'next/router';
import { useMainStore } from '../../../store/MainStore';
import { Toast } from '../../parts';
function Invoice({ invoice = null, invoiceProducts = null }) {
    const { products, clients, clientsInvoices } = useMainStore(state => state);
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

    const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '0');
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
            amount: 0
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
                return { ...p, [name]: value, amount: amountValue };
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
            <div className="search-box">
                <div className="search-header">
                    Products
                </div>
                <div className="w-full overflow-x-auto relative max-h-64 overflow-y-auto ">
                    <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400" style={{ 'width': "100%" }}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 sticky top-0 dark:text-gray-400">
                            <tr>
                                <th className={classes.th + ' xs'}>#</th>
                                <th className={classes.th + ' xs'}></th>
                                <th className={classes.th + ' lg'}>Barcode</th>
                                <th className={classes.th + ' lg'}>Name</th>
                                <th className={classes.th + ' md'}>Unit</th>
                                <th className={classes.th + ' md'}>Quantity</th>
                                <th className={classes.th + ' md'}>Price</th>
                                <th className={classes.th + ' md'}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems.map((product, index) =>
                                <tr key={index} className="bg-white even:bg-gray-200">
                                    <td className={classes.td} >
                                        {invoiceItems.length - index}
                                    </td>
                                    <td className={classes.td} onClick={() => removeInvoiceItem(index)}>
                                        {<icons.Delete />}
                                    </td>
                                    <td className={classes.td}>
                                        <input type="text" className={classes.input} name="barcode" value={product.barcode} readOnly />
                                    </td>
                                    <td className={classes.td}>
                                        <input type="text" className={classes.input} name="name" value={product.name} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={classes.td}>
                                        <input type="text" className={classes.input} name="unit" value={product.unit} readOnly />
                                    </td>
                                    <td className={classes.td}>
                                        <input type="number" className={classes.input} name="quantity" value={product.quantity} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={classes.td}>
                                        <input type="number" className={classes.input} name="price" value={product.price} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={classes.td}>
                                        <input type="number" className={classes.input} name="amount" readOnly value={product.amount} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-full flex flex-wrap justify-between pt-6 mt-12 '>
                <div className="relative z-0 mb-6 w-full md:w-[32%]  group">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Notes</label>
                    <textarea id="message" rows="4" value={data.notes} className={classes.textarea} name="notes" onChange={e => handleOnChange(e)} placeholder="Notes"></textarea>
                </div>
                <div className="relative mt-2 z-0 mb-6 w-full flex gap-y-4 flex-col md:w-[32%]  group">
                    <div className='relative'>
                        <label className={classes.label}>Discount</label>
                        <input type="text"
                            name='discount'
                            className={classes.input}
                            value={data.discount}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>
                    <div className='relative'>
                        <label className={classes.label}>Total with Discount</label>
                        <input type="text"
                            name='total'
                            className={classes.input}
                            value={+data.total + +data.discount}
                            readOnly
                            placeholder=" " />
                    </div>


                </div>
                <div className="relative mt-2 z-0 mb-6 w-full md:w-[32%]  group">
                    <div className='relative'>
                        <label className={classes.label}>Total</label>
                        <input type="text"
                            name='total'
                            className={classes.input}
                            value={data.total}
                            readOnly
                            placeholder=" " />
                    </div>
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