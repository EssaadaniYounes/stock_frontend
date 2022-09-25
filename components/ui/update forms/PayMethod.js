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
function PayMethod({ payMethod = null, callBack, setState = null }) {
    const { t } = useTranslation();
    const [data, setData] = useState(payMethod ? payMethod : {
        name: ''
    })
    const { payMethods, setPayMethods } = useMainStore(state => state);
    const { setShowPayMethod } = useSharedVariableStore(state => state);
    const ref = useRef();


    useOnClickOutside(ref, () => { setShowPayMethod(false), setState && setState(null) });

    const handleOnSubmit = async () => {
        const id = toast.loading('Please wait...')
        if (!payMethod) {
            const res = await addService('pay_methods', data);
            setPayMethods([...payMethods, res.data]);
            if (callBack) {
                callBack(res.data.id);
            }
            ToastDone("Method added successfully", id, res);


        }
        else {
            const res = await updateService('pay_methods', payMethod.id, data);
            const newPayMethods = payMethods.map(m => {
                if (m.id == payMethod.id) { return { ...m, name: data.name } }
                return m;
            });
            ToastDone("Method updated successfully", id, res);
            setPayMethods(newPayMethods)
            setState && setState(null)
        }
        setShowPayMethod(false);
    }

    return (
        <div className='w-full h-[calc(100vh-110px)] bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute top-[50px] z-10 flex items-center justify-center'>
            <Form>
                <div ref={ref} className="w-[300px] p-4">
                    <p className='mb-4 font-semibold underline text-gray-700'>{!payMethod ? t('common:actions.add') : t('common:actions.update')} {t('common:models.pay_method')}</p>
                    <div className="relative z-0 mb-6 w-full  group">
                        <input type="text"
                            name='name'
                            className={classes.input}
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder=" " />
                        <label className={classes.label}>{t('common:info.name')}</label>
                    </div>
                    <button onClick={() => handleOnSubmit()} className={`${!payMethod ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                        {<icons.Save />}
                        <div className='ml-1'>{t('common:actions.save')}</div>
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default PayMethod