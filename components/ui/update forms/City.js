import React, { useRef, useState } from 'react'
import { Form } from '../../parts'
import icons from '../../../data/iconsComponents'
import { addService, updateService } from '../../../services'
import { useOnClickOutside } from '../../../hooks/click-outside'
import { useSharedVariableStore } from '../../../store/sharedVariablesStore'
import { useMainStore } from '../../../store/MainStore';
import ToastDone from '../../../utils/toast-update'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTranslation from 'next-translate/useTranslation'

const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ltr:peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function City({ city = null, callBack, setState = null }) {
    const { t } = useTranslation();
    const [data, setData] = useState(city ? city : {
        name: ''
    })
    const { cities, setCities } = useMainStore(state => state);
    const { setShowCity } = useSharedVariableStore(state => state);
    const ref = useRef();


    useOnClickOutside(ref, () => { setShowCity(false), setState && setState(null) });

    const handleOnSubmit = async () => {
        const id = toast.loading('Please wait...')
        if (!city) {
            const res = await addService('cities', data);
            setCities([...cities, res.data]);
            if (callBack) {
                callBack(res.data.id);
            }
            ToastDone("City added successfully", id, res);


        }
        else {
            const res = await updateService('cities', city.id, data);
            const newCities = cities.map(c => {
                if (c.id == city.id) { return { ...c, name: data.name } }
                return c;
            });
            ToastDone("City updated successfully", id, res);
            setCities(newCities)
            setState && setState(null)
        }
        setShowCity(false);
    }

    return (
        <div className='w-full h-[calc(100vh-110px)] bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute top-[50px] z-10 flex items-center justify-center'>
            <Form>
                <div ref={ref} className="w-[300px] p-4">
                    <p className='mb-4 font-semibold underline text-gray-700'>{!city ? t('common:actions.add') : t('common:actions.update')} {t('common:info.city')}</p>
                    <div className="relative z-0 mb-6 w-full  group">
                        <input type="text"
                            name='full_name'
                            className={classes.input}
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder=" " />
                        <label className={classes.label}>{t('common:info.city')}</label>
                    </div>
                    <button onClick={() => handleOnSubmit()} className={`${!city ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                        {<icons.Save />}
                        <div className='ml-1'>{t('common:actions.save')}</div>
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default City