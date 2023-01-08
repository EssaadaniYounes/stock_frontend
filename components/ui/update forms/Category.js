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
function Category({ category = null, callBack = null, setState = null }) {
    const { t } = useTranslation();
    const [data, setData] = useState(category ? category : {
        name: '',
        init: 0
    })
    const [isLoading, setIsLoading] = useState(false);
    const { categories, setCategories } = useMainStore(state => state);
    const { setShowCategory } = useSharedVariableStore(state => state);
    const focusRef = useRef();

    useFocus(focusRef);

    const handleOnSubmit = async () => {
        setIsLoading(true);
        const id = toast.loading('Please wait...')
        if (!category) {
            const res = await addService('categories', data);
            callBack ? setCategories([{ value: res.data.id, label: res.data.name }, ...categories])
                : setCategories([...categories, res.data]);
            if (callBack) {
                callBack(res.data.id);
            }
            ToastDone("Category added successfully", id, res);
        }
        else {
            const res = await updateService('categories', category.id, data);
            const newCategories = categories.map(c => {
                if (c.id == category.id) { return { ...c, name: data.name } }
                return c;
            });
            ToastDone("Category updated successfully", id, res);
            setCategories(newCategories)
            setState && setState(null);
        }
        setIsLoading(false);
        setShowCategory(false);
    }

    return (
        <div className='w-full h-[calc(100vh-110px)] inset-0 bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute top-[50px] z-10 flex items-center justify-center'>
            {isLoading && <RequestLoader />}
            <Form>
                <div className="w-[300px]">
                    <FormItemsContainer>
                        <FormHeader title={t('common:models.category')} isEdit={category} closeCallBack={() => setShowCategory(false)} />
                        <div className="form-content">
                            <div className="input-container mb-2">
                                <label className='label'>{t('common:models.category')}</label>
                                <input type="text"
                                    name='full_name'
                                    ref={focusRef}
                                    className='input-rounded'
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    placeholder=" " />
                            </div>
                            <button onClick={() => handleOnSubmit()} className={`${!category ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
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

export default Category