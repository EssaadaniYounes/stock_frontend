import React, { useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
import { useMainStore } from '../../../store/MainStore';
import { useSharedVariableStore } from '../../../store/sharedVariablesStore';
const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import ToastDone from '../../../utils/toast-update';
import { Toast } from '../../parts';
import useTranslation from 'next-translate/useTranslation';
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
    const { vendors, setVendors } = useMainStore(state => state);
    const { setShowVendor } = useSharedVariableStore(state => state);
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async () => {
        const id = toast.loading(t('common:toast.wait'));
        if (vendor) {
            const res = await updateService('vendors', vendor.id, data);
            ToastDone(t('common:toast.update'), id, res);
        }
        else {
            const res = await addService('vendors', data);
            setVendors([...vendors, res.data]);
            if (callBack) {
                callBack(res.data.id);
                setShowVendor(false);
            }
            ToastDone(t('common:toast.add'), id, res);
        }
        if (!callBack) {
            setTimeout(() => {
                router.push('/dashboard/vendors');
            }, 1500);
        }
    }

    return (
        <div className="flex flex-col ">
            <Toast />
            <div className='w-full flex flex-wrap gap-x-2'>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <input type="text"
                        name='full_name'
                        className={classes.input}
                        value={data.full_name}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>{t('common:info.full_name')}</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='email'
                        value={data.email}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>{t('common:info.email')}</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='tel'
                        value={data.tel}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>{t('common:info.phone')}</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='street'
                        value={data.street}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>{t('common:info.street')}</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='zip_code'
                        value={data.zip_code}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>{t('common:info.zip_code')}</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <select className={classes.input}
                        name='city_id'
                        value={data.city_id}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" ">
                        <option value="0">Select City</option>
                        {cities.map((c) => <option value={c.id} key={c.id}>{c.name}</option>)}
                    </select>
                    <label className={classes.label}>{t('common:info.city')}</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='address'
                        value={data.address}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>{t('common:info.address')}</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='ice'
                        value={data.ice}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>{t('common:info.ice')}</label>
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