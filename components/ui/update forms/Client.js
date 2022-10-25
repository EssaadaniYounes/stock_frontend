import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import useTranslation from 'next-translate/useTranslation';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import ToastDone from '@/utils/toast-update';
import { can } from '@/utils/can';
import { FormHeader, FormItemsContainer, Modal, RequestLoader, Toast } from '@/components/parts';
import { useMainStore } from '@/store/MainStore';
import { addService, updateService } from '@/services';
import icons from '@/data/iconsComponents';
import CreatableSelect from 'react-select/creatable';
import { useSharedVariableStore } from '@/store/sharedVariablesStore';
import City from './City';
import { useOnClickOutside } from '@/hooks/click-outside';
import { useGetPermissions } from '@/hooks/get-permissions';
import useFocus from '@/hooks/useAutoFocus';
import Select from 'react-select';
import selectAdd from '@/services/selectAdd';
function Client({ client = null }) {
    const router = useRouter();
    const { t } = useTranslation();
    const { cities, setCities } = useMainStore(state => state);
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
    const [isLoading, setIsLoading] = useState(false);
    const { setShowCity, showCity } = useSharedVariableStore(state => state)
    const permissions = useGetPermissions();
    const ref = useRef();
    const focusRef = useRef();

    useFocus(focusRef)
    useOnClickOutside(ref, () => setShowCity(false))
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async () => {
        setIsLoading(true);
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
            setIsLoading(false);
            router.push('/dashboard/clients');
        }, 1500);
    }

    return (
        <div className="flex flex-col">
            {showCity && <Modal><City ref={ref} callBack={(val) => setData({ ...data, city_id: val })} /></Modal>}
            {isLoading && <RequestLoader />}
            <Toast />
            <FormItemsContainer>
                <FormHeader title={t('common:models.client')} isEdit={client} />
                <div className="flex flex-col form-content">
                    <div className="items-container">
                        <div className="input-container">
                            <label className='label'>{t('common:info.full_name')}</label>
                            <input type="text"
                                ref={focusRef}
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
                    <div className="items-container">
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
                    <div className="items-container">
                        <div className="input-container">
                            <label className="label">{t('common:models.city')}</label>
                            {
                                Object.keys(permissions).length > 0 &&
                                    can(permissions.cities, 'create') ?
                                    <CreatableSelect
                                        options={cities}
                                        onCreateOption={(v) => selectAdd('cities', { name: v }, (id) => setData({ ...data, city_id: id }), cities, setCities)}
                                        value={cities.find(c => c.value == data.city_id) || cities[0]}
                                        onChange={v => setData({ ...data, city_id: v.value })}
                                    /> :
                                    <Select options={cities}
                                        value={cities.find(c => c.value == data.city_id) || cities[0]}
                                        onChange={v => setData({ ...data, city_id: v.value })} />
                            }
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
                    <div className="items-container">
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
            </FormItemsContainer>
        </div>
    )
}

export default Client