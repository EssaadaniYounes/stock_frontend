import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import useTranslation from 'next-translate/useTranslation';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import ToastDone from '../../../utils/toast-update';
import { Modal, Toast } from '../../parts';
import { useMainStore } from '../../../store/MainStore';
import { addService, updateService } from '../../../services';
import icons from '../../../data/iconsComponents';
import CreatableSelect from 'react-select/creatable';
import { useSharedVariableStore } from '../../../store/sharedVariablesStore';
import City from './City';
import { useOnClickOutside } from '../../../hooks/click-outside';
function Client({ client = null }) {
    const router = useRouter();
    const { t } = useTranslation();
    const { cities } = useMainStore(state => state);
    const [data, setData] = useState(client ? client : {
        full_name: '',
        street: '',
        zip_code: '',
        city_id: '0',
        address: '',
        tel: '',
        email: '',
        ice: ''
    });
    const { setShowCity,showCity } = useSharedVariableStore(state => state)
    const ref = useRef();
    useOnClickOutside(ref, () => setShowCity(false))
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async () => {
        const id = toast.loading(t('common:toast.wait'))
        if (client) {
            const res = await updateService('clients', client.id, data);
            ToastDone(t('common:toast.update'), id, res);

        }
        else {
            const res = await addService('clients', data);
            ToastDone(t('common:toast.add'), id, res);
        }
        setTimeout(() => {
            router.push('/dashboard/clients');
        }, 1500);
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
            <button onClick={() => handleOnSubmit()} className={`${!client ? 'button-save' : 'yellow-button'} max-w-[180px] flex items-center mx-auto`}>
                {<icons.Save />}
                <div className='mx-1'>
                    {t('common:actions.save')}
                </div>
            </button>
        </div>
    )
}

export default Client