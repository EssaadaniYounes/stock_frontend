import React, { useEffect, useRef, useState } from 'react'
import icons from '@/data/iconsComponents';
import { addService, deleteService, updateService } from '@/services';
import { Product } from '@/components/ui'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '@/utils/toast-update';
import { useMainStore } from '@/store/MainStore';
import { FormHeader, FormItemsContainer, Modal, RequestLoader, Toast } from '@/components/parts';
import { useRouter } from 'next/router';
import getToday from '@/utils/get-today';
import currency from '@/utils/format-money';
import useTranslation from 'next-translate/useTranslation';
import { getDate } from '@/utils/dates';
import useFocus from '@/hooks/useAutoFocus';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import useDefaultPayMethod from '@/hooks/use-default-pay-method';
import selectAdd from '@/services/selectAdd';
import { useGetPermissions } from '@/hooks/get-permissions';
import { can } from '@/utils/can';
function VendorInvoice({ invoice = null, invoiceProducts = null }) {
    const { t } = useTranslation();
    const { products, vendors, setProducts, config, payMethods, categories, units, setVendors, setCategories, setUnits } = useMainStore(state => state);
    const router = useRouter();
    const [data, setData] = useState(invoice ? invoice : {
        vendor_id: 1,
        invoice_num: '',
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
    const [selectedProduct, setSelectedProduct] = useState({
        barcode: '',
        name: '',
        category_id: '',
        unit_id: '',
        qty: '',
        buy_price: '',
        sell_price: ''
    });
    const [unExistedProducts, setUnExistedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef();
    const focusRef = useRef();
    const qtyRef = useRef();
    const productRef = useRef();
    const permissions = useGetPermissions();

    useFocus(focusRef)

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
    //set default pay method
    useDefaultPayMethod(data, setData);

    const resetProduct = () => {
        setSelectedProduct({
            barcode: '',
            name: '',
            category_id: '',
            unit_id: '',
            qty: '',
            buy_price: '',
            sell_price: ''
        })
    }

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
    const onProductChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setSelectedProduct({ ...selectedProduct, [name]: value });
    }
    const onAddProduct = async () => {
        console.log(selectedProduct)
        if (selectedProduct.barcode == "") {
            alert(t('common:toast.fill_barcode'));
            ref.current.focus();
            return;
        }
        const isInInvoice = invoiceItems.find(iI => iI.product_id == selectedProduct.id);
        let qty = 1;
        if (isInInvoice) {
            let index = 0;
            qty = +selectedProduct.qty + +isInInvoice.quantity;
            let amount = isInInvoice.price * qty;
            const discount = isInInvoice.discount;
            let amountAfterDiscount = amount - discount;
            const taxAmount = amountAfterDiscount * (parseInt(config.default_tax) / 100);
            const amountTotal = amountAfterDiscount + taxAmount;

            const newItems = invoiceItems.map((item, i) => {
                index = i;
                if (item.product_id == isInInvoice.product_id) {
                    return {
                        ...item,
                        quantity: qty,
                        amount,
                        discount,
                        tax_amount: taxAmount,
                        amount_total: amountTotal
                    };
                }
                return item;
            })
            setInvoiceItems(v => newItems);

            //calcAmount(index);
        }
        else {

            const isInProducts = products.find(p => p.id == selectedProduct.id);
            let productId = selectedProduct.id;
            let isExisted = true;
            if (!isInProducts) {
                const { barcode, name, qty: quantity_initial, unit_id, category_id, sell_price, buy_price } = selectedProduct;
                productId = Math.floor(Math.random() * 1000);
                isExisted = false;
                const p = {
                    temporary_id: productId,
                    id: productId,
                    barcode,
                    name,
                    quantity_initial,
                    unit_id,
                    unit_name: units.find(unit => unit.value == unit_id).label,
                    category_id,
                    sell_price,
                    buy_price,
                    vendor_id: data.vendor_id,
                }
                // const res = await addService('products', p);
                setProducts([...products, p]);
                setUnExistedProducts([...unExistedProducts, p]);
            }
            qty = selectedProduct.qty;
            let amount = selectedProduct.sell_price * qty;
            let discount = 0;
            let tax_amount = amount * (parseInt(config.default_tax) / 100);
            const amount_total = amount + tax_amount;

            const Obj = {
                name: selectedProduct.name,
                unit: selectedProduct.unit_id,
                is_existed: isExisted,
                barcode: selectedProduct.barcode,
                product_id: productId,
                price: selectedProduct.sell_price,
                quantity: selectedProduct.qty,
                amount,
                discount,
                tax_amount,
                amount_total
            }
            setInvoiceItems([Obj, ...invoiceItems]);
        }
        resetProduct();

    }
    const onItemChange = (e, index) => {
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
    }
    const handleBarcodeSearch = (e) => {
        if (e.code == 'Enter') {
            const product = products.find(p => p.barcode == e.target.value);
            if (product) {
                product.qty = 1;
                qtyRef.current.focus();
                return setSelectedProduct(product);
            }
            setSelectedProduct({
                barcode: selectedProduct.barcode,
                name: '',
                category_id: '',
                unit_id: '',
                qty: '',
                buy_price: '',
                sell_price: ''
            })
            productRef.current.focus();
        }
    }

    const removeInvoiceItem = async (index) => {
        const invoice_item = invoiceItems.find((item, i) => i == index);
        if (invoice_item) {
            if (invoice_item.id) {
                const res = await deleteService(`vendors_invoices_items`, invoice_item.id, "Invoice item");
            }
        }
        const items = invoiceItems.filter((item, i) => i != index);
        setInvoiceItems(items);
    }
    const handleOnSubmit = async () => {
        setIsLoading(true);
        const id = toast.loading("Please wait...")
        if (invoice) {
            const res = await updateService('vendors_invoices', invoice.id, { invoice: data, invoice_items: invoiceItems, un_existed_products: unExistedProducts });
            console.log(res);
            ToastDone("Invoice updated successfully", id, res);
        }
        else {
            const res = await addService('vendors_invoices', { invoice: data, invoice_items: invoiceItems, un_existed_products: unExistedProducts });
            ToastDone("Invoice added successfully", id, res);
        }
        setIsLoading(false);
        setTimeout(() => {
            router.push('/dashboard/vendors/bls');
        }, 1500);
    }

    return (
        <div className={`flex flex-col ltr:mr-2 rtl:ml-3 shadow-md mb-2 rounded-b-md `}>
            <Toast />
            {isLoading && <RequestLoader />}
            <FormItemsContainer>
                <FormHeader title={t('common:models.supplier_bl')} isEdit={invoice} />
                <div className="form-content">
                    <div className='flex flex-col gap-y-1'>
                        <div className='search-box pb-1' style={{ overflow: 'visible' }}>
                            <div className='search-header'>{t('common:info.invoice_info')}</div>
                            <div className="search-body">
                                <div className="input-container">
                                    <label className='label'>{t('common:info.invoice_num')}</label>
                                    <input type="text"
                                        name='invoice_num'
                                        className='input-rounded'
                                        ref={focusRef}
                                        value={data.invoice_num}
                                        onChange={(e) => handleOnChange(e)}
                                        placeholder=" " />
                                </div>
                                <div className="input-container">
                                    <label className='label'>{t('common:info.date')}</label>
                                    <input type="date"
                                        name='invoice_date'
                                        className='input-rounded'
                                        value={getDate(data.invoice_date, true)}
                                        onChange={(e) => handleOnChange(e)}
                                        placeholder=" " />
                                </div>
                                <div className="input-container z-[500]">
                                    <label className='label'>{t('common:models.vendor')}</label>
                                    {
                                        Object.keys(permissions).length > 0 &&
                                            can(permissions.vendors, 'create')
                                            ? <CreatableSelect options={vendors}
                                                onCreateOption={(v) => selectAdd('vendors', { full_name: v, city_id: '1' }, (id) => setData({ ...data, vendor_id: id }), vendors, setVendors)}
                                                value={vendors.find(v => v.value == data.vendor_id) || vendors[0]}
                                                onChange={v => setData({ ...data, vendor_id: v.value })}
                                            />
                                            : <Select options={vendors}
                                                value={vendors.find(v => v.value == data.vendor_id) || vendors[0]}
                                                onChange={v => setData({ ...data, vendor_id: v.value })}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="search-box" style={{ overflow: 'visible' }}>
                            <div className="search-header">
                                {t('common:info.invoice_items')}
                            </div>
                            <div className="flex flex-wrap flex-col md:flex-row gap-y-2 justify-center items-center w-full my-1 min-h-[80px] px-2 gap-x-2 ">
                                <div className="flex flex-wrap flex-col flex-1 gap-y-2 w-full">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <div className="flex-1 min-w-[100px] ">
                                            <label className='label'>{t('common:info.barcode')}</label>
                                            <input type="text"
                                                name='barcode'
                                                ref={ref}
                                                value={selectedProduct.barcode}
                                                className='input-rounded'
                                                onChange={e => onProductChange(e)}
                                                onKeyDown={(e) => handleBarcodeSearch(e)}
                                                placeholder={t('common:info.barcode')} />
                                        </div>
                                        <div className="flex-[2] min-w-[100px] ">
                                            <label className='label'>{t('common:models.product')}</label>
                                            <input type="text"
                                                name='name'
                                                ref={productRef}
                                                onChange={e => onProductChange(e)}
                                                value={selectedProduct.name}
                                                className='input-rounded'
                                                placeholder={t('common:models.product')} />
                                        </div>
                                        <div className="flex-1 min-w-[100px] ">
                                            <label className='label'>{t('common:models.category')}</label>
                                            {
                                                Object.keys(permissions).length > 0 &&
                                                    can(permissions.categories, 'create')
                                                    ? <CreatableSelect options={categories}
                                                        onCreateOption={(v) => selectAdd('categories', { name: v }, (id) => setSelectedProduct({ ...selectedProduct, category_id: id }), categories, setCategories)}
                                                        value={categories.find(c => c.value == selectedProduct.category_id) || categories[0]}
                                                        onChange={v => setSelectedProduct({ ...selectedProduct, category_id: v.value })}
                                                    />
                                                    : <Select options={categories}
                                                        value={categories.find(c => c.value == selectedProduct.category_id) || categories[0]}
                                                        onChange={v => setSelectedProduct({ ...selectedProduct, category_id: v.value })}
                                                    />
                                            }
                                        </div>

                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <div className="flex-1 min-w-[100px] ">
                                            <label className='label'>{t('common:models.unit')}</label>
                                            {
                                                Object.keys(permissions).length > 0 &&
                                                    can(permissions.units, 'create')
                                                    ? <CreatableSelect
                                                        options={units}
                                                        onCreateOption={(v) => selectAdd('units', { name: v }, (id) => setSelectedProduct({ ...selectedProduct, unit_id: id }), units, setUnits)}
                                                        value={units.find(u => u.value == selectedProduct.unit_id) || units[0]}
                                                        onChange={v => setSelectedProduct({ ...selectedProduct, unit_id: v.value })}
                                                    />
                                                    : <Select
                                                        options={units}
                                                        value={units.find(u => u.value == selectedProduct.unit_id) || units[0]}
                                                        onChange={v => setSelectedProduct({ ...selectedProduct, unit_id: v.value })}
                                                    />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-[100px] ">
                                            <label className='label'>{t('common:info.qte')}</label>
                                            <input type="text"
                                                name='qty'
                                                ref={qtyRef}
                                                value={selectedProduct.qty}
                                                onChange={e => onProductChange(e)}
                                                className='input-rounded'
                                                placeholder={t('common:info.qte')} />
                                        </div>
                                        <div className="flex-1 min-w-[100px] ">
                                            <label className='label'>{t('common:info.buy_price')}</label>
                                            <input type="text"
                                                name='buy_price'
                                                onChange={e => onProductChange(e)}
                                                value={selectedProduct.buy_price}
                                                className='input-rounded'
                                                placeholder={t('common:info.buy_price')} />
                                        </div>
                                        <div className="flex-1 min-w-[100px] ">
                                            <label className='label'>{t('common:info.sell_price')}</label>
                                            <input type="text"
                                                name='sell_price'
                                                onChange={e => onProductChange(e)}
                                                value={selectedProduct.sell_price}
                                                className='input-rounded'
                                                placeholder={t('common:info.sell_price')} />
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <div className="hovered-blue-button" onClick={() => onAddProduct()}>
                                        {<icons.Add />}
                                    </div>
                                    <div className="hovered-yellow-button" onClick={() => resetProduct()} title="reset">
                                        {<icons.Reload />}
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
                                                <input type="text" className={'input-rounded rounded-none bg-gray-100 text-center'} name="barcode" value={products.find((p, i) => p.id == product.product_id)?.barcode} readOnly />
                                            </td>
                                            <td className={'lg'}>
                                                <input type="text" className={'input-rounded rounded-none'} name="name" value={product.name} onChange={(e) => onItemChange(e, index)} />
                                            </td>
                                            <td className={'xs'}>
                                                <input type="text" className={'input-rounded rounded-none bg-gray-100 text-center'} name="unit" value={products.find((p, i) => p.id == product.product_id)?.unit_name} readOnly />
                                            </td>
                                            <td className={'xs'}>
                                                <input type="text" className={'input-rounded  text-center rounded-none'}
                                                    name="quantity" value={product.quantity} onChange={(e) => onItemChange(e, index)} />
                                            </td>
                                            <td className={'xs'}>
                                                <input type="text" className={'input-rounded  text-center rounded-none'} name="price" value={product.price} onChange={(e) => onItemChange(e, index)} />
                                            </td>
                                            <td className={'xs'}>
                                                <input type="text" className={'input-rounded  text-right rounded-none bg-gray-100 '} name="amount" readOnly value={currency(product.amount)} />
                                            </td>
                                            <td className={'xs'}>
                                                <input type="text" className={'input-rounded  text-center rounded-none'} name="discount" value={(product.discount)} onChange={(e) => onItemChange(e, index)} />
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
                                        readOnly={data.method_id == 1}
                                        value={data.paid_amount}
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
            </FormItemsContainer >
        </div >
    )
}

export default VendorInvoice