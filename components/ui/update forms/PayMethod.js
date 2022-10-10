import React, { useRef, useState } from 'react'
import { Form, FormHeader, FormItemsContainer, RequestLoader } from '../../parts'
import icons from '../../../data/iconsComponents'
import { addService, updateService } from '../../../services'
import { useOnClickOutside } from '../../../hooks/click-outside'
import { useSharedVariableStore } from '../../../store/sharedVariablesStore'
import { useMainStore } from '../../../store/MainStore';
import ToastDone from '../../../utils/toast-update'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFocus from '../../../hooks/useAutoFocus'
import useTranslation from 'next-translate/useTranslation'

function PayMethod({ payMethod = null, callBack, setState = null }) {
    const { t } = useTranslation();
    const [data, setData] = useState(payMethod ? payMethod : {
        name: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const { payMethods, setPayMethods } = useMainStore(state => state);
    const { setShowPayMethod } = useSharedVariableStore(state => state);
    const ref = useRef();
    const focusRef = useRef();
    useFocus(focusRef)

    useOnClickOutside(ref, () => { setShowPayMethod(false), setState && setState(null) });

    const handleOnSubmit = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
        setShowPayMethod(false);
    }

    return (
        <div className='w-full h-[calc(100vh-110px)] bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute top-[50px] z-10 flex items-center justify-center'>
            {isLoading && <RequestLoader />}
            <Form>
                <div ref={ref} className="w-[300px]">
                    <FormItemsContainer>
                        <FormHeader title={t('common:models.pay_method')} isEdit={payMethod} />
                        <div className="form-content"><div className="input-container mb-2">
                            <label className='label'>{t('common:info.name')}</label>
                            <input type="text"
                                name='name'
                                ref={focusRef}
                                className='input-rounded'
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                placeholder=" " />
                        </div>
                            <button onClick={() => handleOnSubmit()} className={`${!payMethod ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                                {<icons.Save />}
                                <div className='ml-1'>{t('common:actions.save')}</div>
                            </button></div>
                    </FormItemsContainer>
                </div>
            </Form>
        </div>
    )
}

export default PayMethod