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
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function Unit({ unit = null, callBack, setState = null }) {
    const [data, setData] = useState(unit ? unit : {
        name: ''
    })
    const { t } = useTranslation();
    const { units, setUnits } = useMainStore(state => state);
    const { setShowUnit } = useSharedVariableStore(state => state);
    const ref = useRef();


    useOnClickOutside(ref, () => { setShowUnit(false), setState && setState(null) });

    const handleOnSubmit = async () => {
        const id = toast.loading('Please wait...')
        if (!unit) {
            const res = await addService('units', data);
            setUnits([...units, res.data]);
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
        setShowUnit(false);
    }

    return (
        <div className='w-full h-[calc(100vh-110px)] bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute top-[50px] z-10 flex items-center justify-center'>
            <Form>
                <div ref={ref} className="w-[300px] p-4">
                    <p className='mb-4 font-semibold underline text-gray-700'>{!unit ? t('common:actions.add') : t('common:actions.update')} {t('common:models.unit')}</p>
                    <div className="relative z-0 mb-6 w-full  group">
                        <input type="text"
                            name='name'
                            className={classes.input}
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder=" " />
                        <label className={classes.label}> {t('common:models.unit')}</label>
                    </div>
                    {/* <div className="relative z-0 mb-6 w-full  group">
                        <input type="text"
                            name='symbol'
                            className={classes.input}
                            value={data.symbol}
                            onChange={(e) => setData({ ...data, symbol: e.target.value })}
                            placeholder=" " />
                        <label className={classes.label}>Symbol</label>
                    </div> */}
                    <button onClick={() => handleOnSubmit()} className={`${!unit ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                        {<icons.Save />}
                        <div className='ml-1'>{t('common:actions.save')}</div>
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default Unit