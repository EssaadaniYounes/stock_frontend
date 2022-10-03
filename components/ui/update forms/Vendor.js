import React, { useRef, useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
import { useMainStore } from '../../../store/MainStore';
import { useSharedVariableStore } from '../../../store/sharedVariablesStore';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import ToastDone from '../../../utils/toast-update';
import { Modal, Toast } from '../../parts';
import useTranslation from 'next-translate/useTranslation';
import { City } from '../';
import { useOnClickOutside } from '../../../hooks/click-outside';
function Vendor({ vendor = null, callBack }) {
    const { t } = useTranslation();
    const { cities } = useMainStore(state => state);
    const [data, setData] = useState(vendor ? vendor : {
        full_name: '',
        street: '',
        zip_code: '',
        city_id: '',
        address: '',
        tel: '',
        email: '',
        ice: ''
    });
    const router = useRouter();
    const ref = useRef();
    useOnClickOutside(ref, () => setShowVendor(false))
    const { vendors, setVendors } = useMainStore(state => state);
    const { setShowVendor, setShowCity, showCity } = useSharedVariableStore(state => state);
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async () => {
        const id = toast.loading('Please wait...')
        if (vendor) {
            const res = await updateService('vendors', vendor.id, data);
            ToastDone(t('common:toast.update'), id, res);
        }
        else {
            const res = await addService('vendors', data);
            callBack ? setVendors([{ value: res.data.id, label: res.data.full_name }, ...vendors])
                : stVendors([...vendors, res.data]);
                if (callBack) {
                    callBack(res.data.id);
                    setShowVendor(false);
                }
            ToastDone("Supplier added successfully", id, res);
        }
        if (!callBack) {
            setTimeout(() => {
                router.push('/dashboard/vendors');
            }, 1500);
        }
    }

    return (
        <div className="flex flex-col">
            {showCity && <Modal><City ref={ref} callBack={(val) => setData({ ...data, city_id: val })} /></Modal>}
            <Toast />
            <div className="flex flex-col">
                <div className="two-items-container">
                    <div className="input-container">
                        <label className='label'>{t('common:info.full_name')}</label>
                        <input type="text"
                            name='full_name'
                            className='input-rounded'
                            value={data.full_name}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>
                    <div className="input-container">
                        <label className='label'>{t('common:info.email')}</label>
                        <input type="text"
                            className='input-rounded'
                            name='email'
                            value={data.email}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>
                </div>
                <div className="two-items-container">
                    <div className="input-container">
                        <label className='label'>{t('common:info.phone')}</label>
                        <input type="text"
                            className='input-rounded'
                            name='tel'
                            value={data.tel}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>
                    <div className="input-container">
                        <label className='label'>{t('common:info.street')}</label>
                        <input type="text"
                            className='input-rounded'
                            name='street'
                            value={data.street}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>
                </div>
                <div className="two-items-container">
                    <div className="input-container">
                        <label className="label">{t('common:models.city')}</label>
                        <CreatableSelect
                            options={cities}
                            onCreateOption={() => setShowCity(true)}
                            value={cities.find(c => c.value == data.city_id) || cities[0]}
                            onChange={v => setData({ ...data, city_id: v.value })}
                        />
                    </div>
                    <div className="input-container">
                        <label className='label'>{t('common:info.zip_code')}</label>
                        <input type="text"
                            className='input-rounded'
                            name='zip_code'
                            value={data.zip_code}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>
                </div>
                <div className="two-items-container">
                    <div className="input-container">
                        <label className='label'>{t('common:info.address')}</label>
                        <input type="text"
                            className='input-rounded'
                            name='address'
                            value={data.address}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>
                    <div className="input-container">
                        <label className="label">{t('common:info.ice')}</label>
                        <input type="text"
                            className='input-rounded'
                            name='ice'
                            value={data.ice}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                    </div>
                </div>
            </div>
            <button onClick={() => handleOnSubmit()} className={`${!vendor ? 'button-save' : 'yellow-button'}  flex items-center mx-auto`}>
                {<icons.Save />}
                <div className='mx-1'>
                    {t('common:actions.save')}
                </div>
            </button>
        </div>
    )
}

export default Vendor