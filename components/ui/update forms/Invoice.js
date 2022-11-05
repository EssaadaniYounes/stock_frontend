import React, { useEffect, useRef, useState } from 'react'
import icons from '@/data/iconsComponents';
import { addService, deleteService, updateService } from '@/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '@/utils/toast-update';
import { useMainStore } from '@/store/MainStore';
import { FormHeader, FormItemsContainer, RequestLoader, Toast } from '@/components/parts';
import { useRouter } from 'next/router';
import getToday from '@/utils/get-today';
import currency from '@/utils/format-money';
import useTranslation from 'next-translate/useTranslation';
import { getDate } from '@/utils/dates';
import useFocus from '@/hooks/useAutoFocus';
import Select from 'react-select';
import useDefaultPayMethod from '@/hooks/use-default-pay-method';
import CreatableSelect from 'react-select/creatable';
import selectAdd from '@/services/selectAdd';
import { useGetPermissions } from '@/hooks/get-permissions';
import { can } from '@/utils/can';
function Invoice({ invoice = null, invoiceProducts = null, InvoiceNum, isPos = false }) {
    const { t } = useTranslation();
    const { products, clients, clientsInvoices, setClientsInvoices, config, payMethods, setClient } = useMainStore(state => state);
    const router = useRouter();
    const [data, setData] = useState(invoice ? invoice : {
        client_id: 1,
        invoice_num: InvoiceNum,
        notes: '',
        invoice_date: getToday(),
        total_discount: 0,
        total_amount: 0,
        total_tax: 0,
        total_with_tax: 0,
        paid_amount: 0,
        rest_amount: 0,
        method_id: 0,
        created_by: ''
    });
    const [invoiceItems, setInvoiceItems] = useState(invoiceProducts ? invoiceProducts : []);
    const [isLoading, setIsLoading] = useState(false);
    const focusRef = useRef();
    useFocus(focusRef)
    const [selectedProductId, setSelectedProductId] = useState(0);
    const permissions = useGetPermissions();
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
    useEffect(() => {
        if (data.method_id == 1) {
            setData({ ...data, paid_amount: 0 })
        }
    }, [data.method_id]);
    useDefaultPayMethod(data, setData);

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
        setSelectedProductId(value);
        const product = products.find(p => p[name] == value);
        let index = 0;
        const invoiceItem = invoiceItems.find(item => item.product_id == product.id);
        if (invoiceItem) {

            const quantity = ++invoiceItem.quantity
            let amount = invoiceItem.price * quantity;
            const discount = invoiceItem.discount;
            let amountAfterDiscount = amount - discount;
            const taxAmount = amountAfterDiscount * (parseInt(config.default_tax) / 100);
            const amountTotal = amountAfterDiscount + taxAmount;
            const newItems = invoiceItems.map((item, i) => {
                index = i;
                if (item.product_id == invoiceItem.product_id) {
                    return {
                        ...item,
                        quantity,
                        amount,
                        discount,
                        tax_amount: taxAmount,
                        amount_total: amountTotal
                    };
                }
                return item;
            })
            setInvoiceItems(newItems);
            calcAmount(index);
        }
        else {
            let amount = product.sell_price * 1;
            let discount = 0;
            let tax_amount = amount * (parseInt(config.default_tax) / 100);
            const amount_total = amount + tax_amount;

            const Obj = {
                name: product.name,
                unit: product.unit_name,
                barcode: product.barcode,
                product_id: product.id,
                price: product.sell_price,
                quantity: 1,
                amount,
                discount,
                tax_amount,
                amount_total
            }
            setInvoiceItems([Obj, ...invoiceItems]);
        }
        // setSelectedProductId(0);
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
                    let amountAfterDiscount = amount - discount;
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
                setSelectedProductId(product.id);
                return handleSelectionChange(e);
            }
            alert("There's no product with this barcode!");
        }
    }

    const removeInvoiceItem = async (index) => {
        const invoice_item = invoiceItems.find((item, i) => i == index);
        let isDeleted = true;
        if (invoice_item) {
            if (invoice_item.id) {
                const res = await deleteService(`clients_invoices_items`, invoice_item.id, "Invoice item");
                if (res.success) {
                    isDeleted = true;
                }
                if (res == false) {
                    isDeleted = false;
                }
            }
        }
        const items = isDeleted ? invoiceItems.filter((item, i) => i != index) : invoiceItems;
        setInvoiceItems(items);
    }
    const handleOnSubmit = async () => {
        setIsLoading(true);
        const id = toast.loading("Please wait...")
        if (!isPos) {

            if (invoice) {
                const res = await updateService('clients_invoices', invoice.id, { invoice: data, invoice_items: invoiceItems });
                ToastDone("Invoice updated successfully", id, res);

            }
            else {
                const res = await addService('clients_invoices', { invoice: data, invoice_items: invoiceItems });
                ToastDone("Invoice added successfully", id, res);
            }
            setIsLoading(false);
            setTimeout(() => {
                router.push('/dashboard/invoices');
            }, 1500);
        }
        else {
            const Obj = { ...data, client_id: clients.find(c => c.init == 1).value };
            if (invoice) {
                const res = await updateService('pos', invoice.id, { invoice: Obj, invoice_items: invoiceItems });
                ToastDone("Invoice updated successfully", id, res);
            }
            else {
                const res = await addService('pos', { invoice: Obj, invoice_items: invoiceItems });
                ToastDone("Invoice added successfully", id, res);
            }
            setIsLoading(false);
            setTimeout(() => {
                router.push('/dashboard/pos');
            }, 1500);
        }
    }

    return (
        <div className="flex flex-col shadow-md rounded-md">
            <Toast />
            {isLoading && <RequestLoader />}
            <FormItemsContainer>
                <div className="form-content">
                    <div className='flex flex-col gap-y-1'>
                        {
                            !isPos && <div className='search-box pb-2' style={{ overflow: 'visible' }}>
                                <div className='search-header'>{t('common:info.invoice_info')}</div>
                                <div className="search-body">
                                    <div className="input-container">
                                        <label className='label'>{t('common:info.invoice_num')}</label>
                                        <input type="text"
                                            name='invoice_num'
                                            className='input-rounded'
                                            readOnly
                                            value={data.invoice_num}
                                            onChange={(e) => handleOnChange(e)}
                                            placeholder=" " />
                                    </div>
                                    <div className="input-container">
                                        <label className='label'>{t('common:info.date')}</label>
                                        <input type="date"
                                            name='invoice_date'
                                            className='input-rounded'
                                            ref={focusRef}
                                            value={getDate(data.invoice_date, true)}
                                            onChange={(e) => handleOnChange(e)}
                                            placeholder=" " />
                                    </div>
                                    <div className="input-container z-[500]">
                                        <label className='label'>{t('common:models.client')}</label>
                                        {
                                            Object.keys(permissions).length > 0 &&
                                                can(permissions.clients, 'create')
                                                ? <CreatableSelect options={clients}
                                                    onCreateOption={(v) => selectAdd('clients', { full_name: v, city_id: '1' }, (id) => setData({ ...data, client_id: id }), clients, setClients)}
                                                    value={clients.find(v => v.value == data.client_id) || clients[0]}
                                                    onChange={v => setData({ ...data, client_id: v.value })}
                                                />
                                                : <Select options={clients}
                                                    value={clients.find(v => v.value == data.client_id) || clients[0]}
                                                    onChange={v => setData({ ...data, client_id: v.value })}
                                                />
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="search-box" style={{ overflow: 'visible' }}>
                            <div className="search-header">
                                {t('common:info.invoice_items')}
                            </div>
                            <div className="flex flex-wrap flex-col md:flex-row gap-y-2 justify-center items-center w-full my-1 min-h-[80px] px-2 gap-x-2 ">
                                <div className="items-container">
                                    <div className="input-container">
                                        {/* <label htmlFor="" className="label">{t('common:info.barcode')}</label> */}
                                        {isPos ? <input type="text"
                                            name='barcode'
                                            ref={focusRef}
                                            className='input-rounded'
                                            onKeyDown={(e) => handleBarcodeSearch(e)}
                                            placeholder={t('common:info.barcode')} />
                                            : <input type="text"
                                                name='barcode'
                                                className='input-rounded'
                                                onKeyDown={(e) => handleBarcodeSearch(e)}
                                                placeholder={t('common:info.barcode')} />
                                        }
                                    </div>
                                    <div className="input-container">
                                        {/* <label className="label">{ t('common:actions.select') }</label> */}
                                        <Select options={products}
                                            onChange={v => handleSelectionChange({ target: { value: v.value, name: 'id' } })}
                                            value={products.find(v => v.value == selectedProductId) || products[0]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="max-h-[300px] w-full pos-table overflow-auto">
                                <table className="w-full max-h-full overflow-scroll text-sm text-left pos-table border-0 text-gray-500 dark:text-gray-400" style={{ 'width': "100%" }} cellSpacing={0} cellPadding={0}>
                                    <thead className="text-[10px] md:text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 sticky top-0 dark:text-gray-400">
                                        <tr>
                                            <th className={'max-xss border-l-0'}>#</th>
                                            <th className={'max-md'}>{t('common:info.barcode')}</th>
                                            <th className={'max-lg'}>{t('common:info.name')}</th>
                                            <th className={'max-xs'}>{t('common:models.unit')} </th>
                                            <th className={'max-xs'}>{t('common:info.qte')}</th>
                                            <th className={'max-xs'}>{t('common:info.price')}</th>
                                            <th className={'max-xs'}>{t('common:info.amount')}</th>
                                            <th className={'max-xs'}>{t('common:info.discount')}</th>
                                            <th className={'max-xs'}>{t('common:info.tax_amount')}</th>
                                            <th className={'max-xs'}>{t('common:info.amount_total')}</th>
                                            <th className={'max-xss border-r-0'}></th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow-y-scroll">
                                        {invoiceItems.map((product, index) =>
                                            <tr key={index} className="bg-white even:bg-gray-200">
                                                <td className={'xss  text-center'} >
                                                    {invoiceItems.length - index}
                                                </td>
                                                <td className={'md'}>
                                                    <input type="text" className={'input-rounded rounded-none bg-gray-100 text-center'} name="barcode" value={products.find((p, i) => p.id == product.product_id)?.barcode} readOnly />
                                                </td>
                                                <td className={'lg'}>
                                                    <input type="text" className={'input-rounded rounded-none'} name="name" value={product.name} onChange={(e) => onProductChange(e, index)} />
                                                </td>
                                                <td className={'md'}>
                                                    <input type="text" className={'input-rounded rounded-none bg-gray-100 text-center'} name="unit" value={products.find((p, i) => p.id == product.product_id)?.unit_name} readOnly />
                                                </td>
                                                <td className={'xs'}>
                                                    <input type="text" className={'input-rounded  text-center rounded-none'}
                                                        name="quantity" value={product.quantity} onChange={(e) => onProductChange(e, index)} />
                                                </td>
                                                <td className={'xs'}>
                                                    <input type="text" className={'input-rounded  text-center rounded-none'} name="price" value={product.price} onChange={(e) => onProductChange(e, index)} />
                                                </td>
                                                <td className={'xs'}>
                                                    <input type="text" className={'input-rounded  text-right rounded-none bg-gray-100 '} name="amount" readOnly value={currency(product.amount)} />
                                                </td>
                                                <td className={'xs'}>
                                                    <input type="text" className={'input-rounded  text-center rounded-none'} name="discount" value={(product.discount)} onChange={(e) => onProductChange(e, index)} />
                                                </td>
                                                <td className={'xs'}>
                                                    <input type="text" className={'input-rounded  text-right rounded-none bg-gray-100 '} readOnly value={currency(product.tax_amount)} />
                                                </td>
                                                <td className={'xs'}>
                                                    <input type="text" className={'input-rounded  text-right rounded-none bg-gray-100'} readOnly value={currency(product.amount_total)} />
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
                                    <label className='label'>{t('common:info.total_amount')}</label>
                                    <input type="text"
                                        name='total_amount'
                                        className={'input-rounded bg-gray-100 text-center'}
                                        value={currency(data.total_amount)}
                                        readOnly
                                        placeholder=" " />
                                </div>
                                <div className='relative flex-1 min-w-[120px]'>
                                    <label className='label'>{t('common:info.total_discount')}</label>
                                    <input type="text"
                                        name='total_discount'
                                        className={'input-rounded text-center bg-gray-100'}
                                        value={currency(data.total_discount)}
                                        readOnly
                                        // onChange={(e) => handleOnChange(e)}
                                        placeholder=" " />
                                </div>

                                <div className='relative flex-1 min-w-[120px]'>
                                    <label className='label'>Tax total</label>
                                    <input type="text"
                                        name='total_tax'
                                        className={'input-rounded bg-gray-100 text-center'}
                                        value={currency(data.total_tax)}
                                        readOnly
                                        placeholder=" " />
                                </div>
                                <div className='relative flex-1 min-w-[120px]'>
                                    <label className='label'>{t('common:info.total_with_tax')}</label>
                                    <input type="text"
                                        name='total_with_tax'
                                        className={'input-rounded bg-gray-100 text-center'}
                                        value={currency(data.total_with_tax)}
                                        readOnly
                                        placeholder=" " />
                                </div>

                            </div>
                            <div className="relative mt-2 z-0 mb-2 w-full flex flex-wrap gap-x-4  group">
                                <div className='relative flex-1 min-w-[120px]'>
                                    <label className='label'>{t('common:info.payment_method')}</label>
                                    <select className='input-rounded' name="method_id" value={data.method_id} onChange={e => handleOnChange(e)}>
                                        {payMethods.map(method => <option value={method.value} key={method.value}>{method.label}</option>)}
                                    </select>
                                </div>
                                <div className='relative flex-1 min-w-[120px]'>
                                    <label className='label'>{t('common:info.paid_amount')}</label>
                                    <input type="text"
                                        name='paid_amount'
                                        className={'input-rounded text-center'}
                                        value={data.paid_amount}
                                        readOnly={data.method_id == 1}
                                        onChange={(e) => handleOnChange(e)}
                                        placeholder=" " />
                                </div>

                                <div className='relative flex-1 min-w-[120px]'>
                                    <label className='label'>{t('common:info.rest_credit')}</label>
                                    <input type="text"
                                        name='rest_amount'
                                        className={'input-rounded bg-gray-100 text-center'}
                                        value={currency(data.rest_amount)}
                                        readOnly
                                        placeholder=" " />
                                </div>

                            </div>
                            <div className="relative z-0 mb-2 w-full group">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{t('common:info.notes')}</label>
                                <textarea id="message" rows="2" value={data.notes} name="notes" onChange={e => handleOnChange(e)} placeholder="Notes"></textarea>
                            </div>

                        </div>
                    </div>
                    <button onClick={() => handleOnSubmit()} className={`${!invoice ? 'button-save' : 'yellow-button'} mt-2 flex items-center mx-auto`}>
                        {<icons.Save />}
                        <div className='ml-1'>{t('common:actions.save')}</div>
                    </button>
                </div>
            </FormItemsContainer>
        </div >
    )
}

export default Invoice