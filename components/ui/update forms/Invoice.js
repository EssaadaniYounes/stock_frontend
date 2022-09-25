import React, { useEffect, useRef, useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, deleteService, updateService } from '../../../services';
const classes = {
    label: 'block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300',
    input: 'bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    textarea: 'block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

}
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '../../../utils/toast-update';
import { useMainStore } from '../../../store/MainStore';
import { Toast } from '../../parts';
import { useRouter } from 'next/router';
import getToday from '../../../utils/get-today';
import currency from '../../../utils/format-money';
import useTranslation from 'next-translate/useTranslation';
import { getDate } from '../../../utils/dates';
function Invoice({ invoice = null, invoiceProducts = null }) {
    const { t } = useTranslation();
    const { products, clients, clientsInvoices, config, payMethods } = useMainStore(state => state);
    const router = useRouter();
    const [data, setData] = useState(invoice ? invoice : {
        client_id: 0,
        invoice_num: 1,
        notes: '',
        invoice_date: getToday(),
        total_discount: 0,
        total_amount: 0,
        total_tax: 0,
        total_with_tax: 0,
        paid_amount: 0,
        rest_amount: 0,
        method_id: 1,
        created_by: ''
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
    //update total_amount value
    useEffect(() => {
        const totalAmount = invoiceItems.reduce((prev, current) => prev + current.amount, 0);
        const totalDiscount = invoiceItems.reduce((prev, current) => prev + +current.discount, 0);
        const totalTax = invoiceItems.reduce((prev, current) => prev + +current.tax_amount, 0);
        const totalWithTax = invoiceItems.reduce((prev, current) => prev + +current.amount_total, 0);
        const restAmount = totalWithTax - data.paid_amount;
        setData(prev => ({
            ...prev,
            total_amount: totalAmount,
            total_discount: totalDiscount,
            total_tax: totalTax,
            total_with_tax: totalWithTax,
            rest_amount: restAmount
        }));
    }, [invoiceItems, data.total_discount]);

    const handleOnChange = (e) => {
        let restAmount = data.rest_amount;
        if (e.target.name == "paid_amount") {
            restAmount = data.total_with_tax - +e.target.value;
        }
        setData({
            ...data,
            [e.target.name]: e.target.value,
            rest_amount: restAmount
        });
    }

    const handleSelectionChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const product = products.find(p => p[name] == value);
        let index = 0;
        const invoiceItem = invoiceItems.find(item => item.product_id == product.id);
        if (invoiceItem) {
            const newItems = invoiceItems.map((item, i) => {
                index = i;
                if (item.product_id == invoiceItem.product_id) {
                    return { ...item, quantity: ++item.quantity };
                }
                return item;
            })
            setInvoiceItems(newItems);
            calcAmount(index);
        }
        else {
            const Obj = {
                name: product.name,
                unit: product.unit_name,
                barcode: product.barcode,
                product_id: product.id,
                price: 0,
                quantity: 1,
                amount: 0,
                discount: 0,
                tax_amount: 0,
                amount_total: 0
            }
            setInvoiceItems([Obj, ...invoiceItems]);
        }
        setSelectedProductId(0);
    }
    function calcAmount(index) {
        let totalAmount = 0;
        let calcedItems = invoiceItems.map((p, i) => {
            if (i == index) {
                const amountValue = p.price * p.quantity;
                const taxAmount = amountValue * (parseInt(config.default_tax) / 100);
                const amountTotal = amountValue + taxAmount;
                totalAmount += amountValue;
                setData({ ...data, total_amount: amountTotal });
                return {
                    ...p,
                    amount: amountValue,
                    tax_amount: taxAmount,
                    amount_total: amountTotal
                }
            }
            return p;
        })
        console.log(calcedItems);
        setInvoiceItems(calcedItems);
    }
    const onProductChange = (e, index) => {
        const name = e.target.name;
        let value = e.target.value;
        const newProducts = invoiceItems.map((p, i) => {
            if (index == i) {
                if (name != "price" && name != "quantity" && name != "discount") {
                    return { ...p, [name]: value };
                }
                if (!isNaN(value)) {
                    let amount = p.amount;
                    if (name == "price" || name == "quantity") {
                        amount = name == "price"
                            ? +value * +p.quantity
                            : +value * +p.price;
                    }

                    const discount = name == "discount" ? value : p.discount;
                    console.log(discount);
                    let amountAfterDiscount = amount - discount;
                    console.log(amountAfterDiscount);
                    const taxAmount = amountAfterDiscount * (parseInt(config.default_tax) / 100);
                    const amountTotal = amountAfterDiscount + taxAmount;
                    return { ...p, [name]: value, amount: amount, tax_amount: taxAmount, amount_total: amountTotal };
                }

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

    const removeInvoiceItem = async (index) => {
        const invoice_item = invoiceItems.find((item, i) => i == index);
        if (invoice_item) {
            if (invoice_item.id) {
                const res = await deleteService(`clients_invoices_items`, invoice_item.id, "Invoice item");
                console.log(res);
            }
        }
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
            ToastDone("Invoice added successfully", id, res);
        }
        setTimeout(() => {
            router.push('/dashboard/invoices');
        }, 1500);
    }

    return (
        <div className="flex flex-col ltr:mr-2 rtl:ml-3">
            <Toast />
            <div className="search-box mb-1">
                <div className="search-header">{t('common:info.invoice_info')}</div>
                <div className="p-1 px-2 w-full">
                    <div className='w-full flex flex-wrap justify-between'>
                        <div className="relative z-0 mb-1 w-full md:w-[32%]  group">
                            <label className={classes.label}>{t('common:info.invoice_num')}</label>
                            <input type="text"
                                name='invoice_num'
                                readOnly
                                className={classes.input}
                                value={data.invoice_num}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-1 w-full md:w-[32%]  group">
                            <label className={classes.label}>{t('common:info.date')}</label>
                            <input type="date"
                                name='invoice_date'
                                className={classes.input}
                                value={getDate(data.invoice_date,true)}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-1 w-full md:w-[32%]  group">
                            <label className={classes.label}>{t('common:models.client')}</label>
                            <select
                                name='client_id'
                                readOnly
                                className={classes.input}
                                value={data.client_id}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " >
                                <option value="0">{t('common:actions.select') + ' ' + t('common:models.client')}</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                            </select>
                        </div>

                    </div>
                </div>
            </div>
            <div className=" search-box  ">
                <div className="search-header">
                    {t('common:info.invoice_items')}
                </div>
                <div className="w-full overflow-auto relative h-[250px]">
                    <div className="p-1 w-full">
                        <div className='w-full flex flex-wrap justify-between'>
                            <div className="relative z-0 mb-2 w-full md:w-[55%]  group">
                                <input type="text"
                                    name='barcode'
                                    className={classes.input}
                                    onKeyDown={(e) => handleBarcodeSearch(e)}
                                    placeholder={t('common:info.barcode')} />
                            </div>

                            <div className="relative z-0 mb-2 w-full md:w-[44%]  group">
                                <select className={classes.input} name='id' value={selectedProductId} onChange={(e) => handleSelectionChange(e)}>
                                    <option value='0' disabled >{t('common:actions.select') + ' ' + t('common:models.product')}</option>
                                    {products.map((p, index) => <option key={index} value={p.id}>{p.barcode + ' / ' + p.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left pos-table border-0 text-gray-500 dark:text-gray-400" style={{ 'width': "100%" }} cellSpacing={0} cellPadding={0}>
                        <thead className="text-[10px] md:text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 sticky top-0 dark:text-gray-400">
                            <tr>
                                <th className={'max-xss border-l-0'}>#</th>
                                <th className={'max-md'}>{t('common:info.barcode')}</th>
                                <th className={'max-lg'}>{t('common:info.name')}</th>
                                <th className={'max-xs'}>{t('common:models.unit')}</th>
                                <th className={'max-xs'}>{t('common:info.qte')}</th>
                                <th className={'max-xs'}>{t('common:info.price')}</th>
                                <th className={'max-xs'}>{t('common:info.amount')}</th>
                                <th className={'max-xs'}>{t('common:info.discount')}</th>
                                <th className={'max-xs'}>{t('common:info.tax_amount')}</th>
                                <th className={'max-xs'}>{t('common:info.amount_total')}</th>
                                <th className={'max-xss border-r-0'}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems.map((product, index) =>
                                <tr key={index} className="bg-white even:bg-gray-200">
                                    <td className={'xss  text-center'} >
                                        {invoiceItems.length - index}
                                    </td>
                                    <td className={'md'}>
                                        <input type="text" className={classes.input + ' rounded-none bg-gray-100 text-center'} name="barcode" value={products.find((p, i) => p.id == product.product_id)?.barcode} readOnly />
                                    </td>
                                    <td className={'lg'}>
                                        <input type="text" className={classes.input + ' rounded-none'} name="name" value={product.name} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={'xs'}>
                                        <input type="text" className={classes.input + ' rounded-none bg-gray-100 text-center'} name="unit" value={products.find((p, i) => p.id == product.product_id)?.unit_name} readOnly />
                                    </td>
                                    <td className={'xs'}>
                                        <input type="text" className={classes.input + '  text-center rounded-none'}

                                            name="quantity" value={product.quantity} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={'xs'}>
                                        <input type="text" className={classes.input + '  text-center rounded-none'} name="price" value={product.price} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={'xs'}>
                                        <input type="text" className={classes.input + '  text-right rounded-none bg-gray-100 '} name="amount" readOnly value={currency(product.amount)} />
                                    </td>
                                    <td className={'xs'}>
                                        <input type="text" className={classes.input + '  text-center rounded-none'} name="discount" value={(product.discount)} onChange={(e) => onProductChange(e, index)} />
                                    </td>
                                    <td className={'xs'}>
                                        <input type="text" className={classes.input + '  text-right rounded-none bg-gray-100 '} readOnly value={currency(product.tax_amount)} />
                                    </td>
                                    <td className={'xs'}>
                                        <input type="text" className={classes.input + '  text-right rounded-none bg-gray-100'} readOnly value={currency(product.amount_total)} />
                                    </td>

                                    <td className={'xss post-table-action'} onClick={() => removeInvoiceItem(index)}>
                                        {<icons.Remove />}
                                    </td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-full flex flex-wrap justify-between invoice-totals'>

                <div className="relative mt-2 z-0 mb-2 w-full flex flex-wrap gap-x-4  group">
                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>{t('common:info.total_amount')}</label>
                        <input type="text"
                            name='total_amount'
                            className={classes.input + ' bg-gray-100 text-center'}
                            value={currency(data.total_amount)}
                            readOnly
                            placeholder=" " />
                    </div>
                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>{t('common:info.total_discount')}</label>
                        <input type="text"
                            name='total_discount'
                            className={classes.input + ' text-center bg-gray-100'}
                            value={currency(data.total_discount)}
                            readOnly
                            // onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>

                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>Tax total</label>
                        <input type="text"
                            name='total_tax'
                            className={classes.input + ' bg-gray-100 text-center'}
                            value={currency(data.total_tax)}
                            readOnly
                            placeholder=" " />
                    </div>
                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>{t('common:info.total_with_tax')}</label>
                        <input type="text"
                            name='total_with_tax'
                            className={classes.input + ' bg-gray-100 text-center'}
                            value={currency(data.total_with_tax)}
                            readOnly
                            placeholder=" " />
                    </div>

                </div>
                <div className="relative mt-2 z-0 mb-2 w-full flex flex-wrap gap-x-4  group">
                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>{t('common:info.payment_method')}</label>
                        <select className={classes.input} name="method_id" value={data.method_id} onChange={e => handleOnChange(e)}>
                            {payMethods.map(method => <option value={method.id} key={method.id}>{method.name}</option>)}
                        </select>
                    </div>
                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>{t('common:info.paid_amount')}</label>
                        <input type="text"
                            name='paid_amount'
                            className={classes.input + ' text-center'}
                            value={data.paid_amount}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>

                    <div className='relative flex-1 min-w-[120px]'>
                        <label className={classes.label}>{t('common:info.rest_credit')}</label>
                        <input type="text"
                            name='rest_amount'
                            className={classes.input + ' bg-gray-100 text-center'}
                            value={currency(data.rest_amount)}
                            readOnly
                            placeholder=" " />
                    </div>

                </div>
                <div className="relative z-0 mb-2 w-full group">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{t('common:info.notes')}</label>
                    <textarea id="message" rows="2" value={data.notes} className={classes.textarea} name="notes" onChange={e => handleOnChange(e)} placeholder="Notes"></textarea>
                </div>

            </div>
            <button onClick={() => handleOnSubmit()} className={`${!invoice ? 'button-save' : 'yellow-button'} mt-2 flex items-center mx-auto`}>
                {<icons.Save />}
                <div className='ml-1'>{t('common:actions.save')}</div>
            </button>
        </div >
    )
}

export default Invoice