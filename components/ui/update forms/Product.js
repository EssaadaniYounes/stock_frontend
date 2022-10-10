import React, { useEffect, useRef, useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
import { useMainStore } from '../../../store/MainStore';
import { useSharedVariableStore } from '../../../store/sharedVariablesStore';
import { Category, Vendor, Unit } from '../';
import { useOnClickOutside } from '../../../hooks/click-outside';
import ToastDone from '../../../utils/toast-update';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { FormHeader, FormItemsContainer, Modal, RequestLoader, Toast } from '../../parts';
import useTranslation from 'next-translate/useTranslation';
import CreatableSelect from 'react-select/creatable';
import useFocus from '../../../hooks/useAutoFocus';

function Product({ items, product = null, setState = null }) {
    const router = useRouter();
    const { t } = useTranslation();
    const { categories, vendors, units, setProducts, products } = useMainStore(state => state);
    const [data, setData] = useState(product ? product : {
        barcode: '',
        vendor_id: 0,
        category_id: 0,
        unit_id: 0,
        name: '',
        quantity_initial: '',
        sell_price: 0,
        buy_price: 0,
    });
    const [isLoading, setIsLoading]= useState(false);
    const { showCategory, setShowCategory, showVendor, setShowVendor, setShowProduct, setShowUnit, showUnit } = useSharedVariableStore(state => state);
    const ref = useRef();
    const focusRef = useRef();
    useFocus(focusRef)
    useEffect(() => {
        // console.log(vendors)
        if (vendors.length > 0) {
            setData({
                ...data, vendor_id: vendors[0].value,
                category_id: categories[0].value,
                unit_id: units[0].value,
            });
        }
    }, [vendors, categories, units]);
    useOnClickOutside(ref, () => { setShowVendor(false) });

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async () => {
        setIsLoading(true);
        const id = toast.loading("Please wait...")
        if (product) {
            const res = await updateService('products', product.id, data);
            ToastDone("Product updated successfully", id, res);
        }
        else {

            const res = await addService('products', data);
            ToastDone("Product added successfully", id, res);
            if (setState) {
                const category_name = categories.find(c => c.id == res.data.category_id).name
                const unit_name = units.find(u => u.id == res.data.unit_id).name
                setProducts([...products, res.data])
                setState({ ...res.data, category_name, unit_name });
                setTimeout(() => {
                    setShowProduct(false)
                }, 1500);
            }
        }
        setIsLoading(false);
        !setState && setTimeout(() => {
            router.push('/dashboard/products');
        }, 1500);
    }

    return (
        <div>
            {showCategory && <div className='-ml-4'><Category callBack={(val) => setData({ ...data, category_id: val })} /></div>}
            {showUnit && <div className='-ml-4'><Unit callBack={(val) => setData({ ...data, unit_id: val })} /></div>}
            {showVendor &&
                <Modal>
                    <div ref={ref} className='bg-white shadow-md rounded-md relative'>
                        <Vendor callBack={(val) => setData({ ...data, vendor_id: val })} />
                    </div>
                </Modal>
            }
            {isLoading && <RequestLoader />}
            <div className="flex flex-col">
                <Toast />

                <FormItemsContainer>
                    <FormHeader title={t('common:models.product')} isEdit={product} />
                    <div className="form-content">
                        <div className="flex flex-col">
                            <div className="items-container">
                                <div className="input-container">
                                    <label className='label'>{t('common:info.barcode')}</label>
                                    <input type="text"
                                        name='barcode'
                                        className='input-rounded'
                                        ref={focusRef}
                                        value={data.barcode}
                                        onChange={(e) => handleOnChange(e)}
                                        placeholder=" " />
                                </div>
                                <div className="input-container">
                                    <label className='label'>{t('common:models.product')}</label>
                                    <input type="text"
                                        name='name'
                                        className='input-rounded'
                                        value={data.name}
                                        onChange={(e) => handleOnChange(e)}
                                        placeholder=" " />
                                </div>
                            </div>
                            <div className="items-container">
                                <div className="input-container">
                                    <label className="label">{t('common:models.vendor')}</label>
                                    <CreatableSelect options={vendors}
                                        onCreateOption={() => setShowVendor(true)}
                                        value={vendors.find(v => v.value == data.vendor_id) || vendors[0]}
                                        onChange={v => setData({ ...data, vendor_id: v.value })}
                                    />
                                </div>
                                <div className="input-container">
                                    <label className="label">{t('common:models.category')}</label>
                                    <CreatableSelect options={categories}
                                        onCreateOption={() => setShowCategory(true)}
                                        value={categories.find(c => c.value == data.category_id) || categories[0]}
                                        onChange={v => setData({ ...data, category_id: v.value })}
                                    />
                                </div>
                            </div>
                            <div className="items-container">
                                <div className="input-container">
                                    <label className="label">{t('common:models.unit')}</label>
                                    <CreatableSelect
                                        options={units}
                                        onCreateOption={() => setShowUnit(true)}
                                        value={units.find(u => u.value == data.unit_id) || units[0]}
                                        onChange={v => setData({ ...data, unit_id: v.value })}
                                    />
                                </div>
                                <div className="input-container">
                                    <label className='label'>{t('common:info.qty_init')}</label>
                                    <input type="text"
                                        name='quantity_initial'
                                        className='input-rounded'
                                        value={data.quantity_initial}
                                        onChange={(e) => handleOnChange(e)}
                                        placeholder=" " />
                                </div>
                            </div>
                            <div className="items-container">
                                <div className="input-container">
                                    <label className="label">{t('common:info.sell_price')}</label>
                                    <input type="number"
                                        name='sell_price'
                                        className='input-rounded'
                                        value={data.sell_price}
                                        onChange={(e) => handleOnChange(e)}
                                        placeholder=" " />
                                </div>
                                <div className="input-container">
                                    <label className="label">{t('common:info.buy_price')}</label>
                                    <input type="number"
                                        name='buy_price'
                                        className='input-rounded'
                                        value={data.buy_price}
                                        onChange={(e) => handleOnChange(e)}
                                        placeholder=" " />
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleOnSubmit()} className={`${!product ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                            {<icons.Save />}
                            <div className='ml-1'>{t('common:actions.save')}</div>
                        </button>
                    </div>
                </FormItemsContainer>
            </div>
        </div>
    )
}

export default Product