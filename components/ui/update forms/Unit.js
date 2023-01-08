import React, { useRef, useState } from 'react'
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
function Unit({ unit = null, callBack, setState = null }) {
    const [data, setData] = useState(unit ? unit : {
        name: '',
        init: 0
    })
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const { units, setUnits } = useMainStore(state => state);
    const { setShowUnit } = useSharedVariableStore(state => state);
    const focusRef = useRef();

    useFocus(focusRef)

    const handleOnSubmit = async () => {
        setIsLoading(true);
        const id = toast.loading('Please wait...')
        if (!unit) {
            const res = await addService('units', data);
            !callBack ? setUnits([...units, res.data]) : setUnits([{ value: res.data.id, label: res.data.name }, ...units]);
            if (callBack) {
                callBack(res.data.id);
            }
            ToastDone("Unit added successfully", id, res);
        }
        else {
            const res = await updateService('units', unit.id, data);
            const newUnits = units.map(u => {
                if (u.id == unit.id) { return { name: data.name } }
                return u;
            });
            ToastDone("Unit updated successfully", id, res);
            setUnits(newUnits);
            setState && setState(null)
        }
        setIsLoading(false);
        setShowUnit(false);
    }

    return (
        <div className='w-full h-[calc(100vh-110px)] inset-0 bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute top-[50px] z-10 flex items-center justify-center'>
            {isLoading && <RequestLoader />}
            <Form>
                <div className="w-[300px]">
                    <FormItemsContainer>
                        <FormHeader title={t('common:models.unit')} isEdit={unit} closeCallBack={() => setShowUnit(false)} />
                        <div className="form-content">
                            <div className="input-container mb-2">
                                <label className='label'> {t('common:info.name')}</label>
                                <input type="text"
                                    name='name'
                                    ref={focusRef}
                                    className='input-rounded'
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    placeholder=" " />
                            </div>
                            {/* <div className="relative z-0 mb-6 w-full  group">
                                    <input type="text"
                                        name='symbol'
                                        className={classes.input}
                                        value={data.symbol}
                                        onChange={(e) => setData({ ...data, symbol: e.target.value })}
                                        placeholder=" " />
                                    <label className={classes.label}>Symbol</label>
                                </div> */
                            }
                            <button onClick={() => handleOnSubmit()} className={`${!unit ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
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

export default Unit