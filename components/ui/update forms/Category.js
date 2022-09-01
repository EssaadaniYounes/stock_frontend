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

const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function Category({ category = null, callBack }) {
    const [data, setData] = useState(category ? category : {
        name: ''
    })
    const { categories, setCategories } = useMainStore(state => state);
    const { setShowCategory } = useSharedVariableStore(state => state);
    const ref = useRef();


    useOnClickOutside(ref, () => { setShowCategory(false) });

    const handleOnSubmit = async () => {
        const id = toast.loading('Please wait...')
        if (!category) {
            const res = await addService('categories', data);
            setCategories([...categories, res.data]);
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
        }
        setShowCategory(false);
    }

    return (
        <div className='w-full h-[calc(100vh-110px)] bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute top-[50px] z-10 flex items-center justify-center'>
            <Form>
                <div ref={ref} className="w-[300px] p-4">
                    <p className='mb-4 font-semibold underline text-gray-700'>{!category ? 'Add' : 'Update'} Category</p>
                    <div className="relative z-0 mb-6 w-full  group">
                        <input type="text"
                            name='full_name'
                            className={classes.input}
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder=" " />
                        <label className={classes.label}>Category name</label>
                    </div>
                    <button onClick={() => handleOnSubmit()} className={`${!category ? 'blue-button' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                        {<icons.Save />}
                        <div className='ml-1'>Save</div>
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default Category