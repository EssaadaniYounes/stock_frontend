import React, { useEffect, useRef, useState } from 'react'
import { Form, FormHeader, FormItemsContainer, RequestLoader } from '@/components/parts'
import icons from '@/data/iconsComponents'
import { addService, updateService } from '@/services'
import { useSharedVariableStore } from '@/store/sharedVariablesStore'
import { useMainStore } from '@/store/MainStore';
import ToastDone from '@/utils/toast-update'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTranslation from 'next-translate/useTranslation'
import useFocus from '@/hooks/useAutoFocus'
import { isText } from '@/utils/validate'

function Printer({ printer = null, callBack, setState = null }) {
    const { t } = useTranslation();
    const [data, setData] = useState(printer ? printer : {
        name: '',
        host: '',
        type: ''
    });
    const [errors, setErrors] = useState({
        name: false,
        host: false,
        type: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const { printers, setPrinters } = useMainStore(state => state);
    const { setShowPrinter } = useSharedVariableStore(state => state);
    const focusRef = useRef();
    useFocus(focusRef);

    const handleErrors = () => {
        const isValid = true;
        if (!isText(data.name) || !isText(data.host) || !isText(data.type)) {
            if (!isText(data.name)) {
                return setErrors({ ...errors, name: true });
            }
            if (!isText(data.host)) {
                return setErrors({ ...errors, host: true });
            }
            if (!isText(data.type)) {
                return setErrors({ ...errors, type: true });
            }
            isValid = true;
        }
        else {
            setErrors({});
        }
        return isValid;
    }

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleOnBlur = () => {
        handleErrors();
    }

    const handleOnSubmit = async () => {

        if (handleErrors()) {
            setIsLoading(true);
            const id = toast.loading('Please wait...')
            if (!printer) {

                const res = await addService('printers', data);
                !callBack ? setPrinters([...printers, res.data]) : setPrinters([{ value: res.data.id, label: res.data.name }, ...printers]);
                console.log(res.data);
                if (callBack) {
                    callBack(res.data.id);
                }
                ToastDone(res.message, id, res);
            }
            else {
                const res = await updateService('printers', printer.id, data);
                const newPrinters = printers.map(p => {
                    if (p.id == printer.id) { return res.data }
                    return p;
                });
                ToastDone("Printer updated successfully", id, res);
                setPrinters(newPrinters)
                setState && setState(null)
            }
            setIsLoading(false);
            setShowPrinter(false);
        }
    }

    return (
        <div className='w-full h-[calc(100vh-110px)] bg-gray-100 inset-0 bg-opacity-40 backdrop-blur-sm  absolute top-[50px] z-10 flex items-center justify-center'>
            {isLoading && <RequestLoader />}
            <Form>
                <div className="w-[300px]">
                    <FormItemsContainer>
                        <FormHeader title={t('common:info.printer')} isEdit={printer} closeCallBack={() => setShowPrinter(false)} />
                        <div className="form-content">
                            <div className="input-container mb-2">
                                <label className='label'>{t('common:info.name')} :</label>
                                <input type="text"
                                    ref={focusRef}
                                    name='name'
                                    className={`input-rounded ${errors.name ? ' border-red-300 animate-[scale_0.5s_ease-in-out]' : 'border-gray-400'}`}
                                    value={data.name}
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder=" " />
                            </div>
                            <div className="input-container mb-2">
                                <label className='label'>{t('common:info.host')} :</label>
                                <input type="text"
                                    ref={focusRef}
                                    name='host'
                                    className={`input-rounded ${errors.host ? ' border-red-300 animate-[scale_0.5s_ease-in-out]' : 'border-gray-400'}`}
                                    value={data.host}
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder=" " />
                            </div>
                            <div className="input-container mb-2">
                                <label className='label'>{t('common:info.type')} :</label>
                                <input type="text"
                                    ref={focusRef}
                                    name='type'
                                    className={`input-rounded ${errors.type ? ' border-red-300 animate-[scale_0.5s_ease-in-out]' : 'border-gray-400'}`}
                                    value={data.type}
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder=" " />
                            </div>
                            <button onClick={() => handleOnSubmit()} className={`${!printer ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                                {<icons.Save />}
                                <div className='ml-1'>{t('common:actions.save')}</div>
                            </button>
                        </div>
                    </FormItemsContainer>
                </div>
            </Form>
        </div>
    )
}

export default Printer