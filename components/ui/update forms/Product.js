import React, { useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
import { useMainStore } from '../../../store/MainStore';
import { useSharedVariableStore } from '../../../store/sharedVariablesStore';
import { Category, Vendor } from '../';

const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function Product({ product = null }) {
    const [data, setData] = useState(product ? product : {
        barcode: '',
        designation: '',
        vendor_id: '',
        category_id: '',
        name: '',
        quantity: '',
        unit: 'kg',
        nbr_products: ''
    });


    const { showCategory, setShowCategory, showVendor, setShowVendor } = useSharedVariableStore(state => state);

    const { categories, vendors } = useMainStore(state => state);



    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async () => {
        if (product) {
            const res = await updateService('products', product.id, data);
        }
        else {
            const res = await addService('products', data);
        }
    }

    return (
        <div>
            {showCategory && <div className='-ml-4'><Category callBack={(val) => setData({ ...data, category_id: val })} /></div>}
            {showVendor &&
                <div className='w-full h-[calc(100vh-110px)] bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute top-[50px] z-10 flex items-center justify-center -ml-4 p-4'>
                    <div className='bg-white p-3 shadow-md rounded-md relative md:top-0 top-20'>
                        <Vendor callBack={(val) => setData({ ...data, vendor_id: val })} />
                    </div>
                </div>
            }
            <div className="flex flex-col p-6">
                <div className='w-full flex flex-wrap gap-x-2'>
                    <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                        <input type="text"
                            name='barcode'
                            className={classes.input}
                            value={data.barcode}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                        <label className={classes.label}>Barcode</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                        <input type="text"
                            name='designation'
                            className={classes.input}
                            value={data.designation}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                        <label className={classes.label}>Designation</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                        <div className="flex items-center">
                            <select
                                value={data.vendor_id}
                                name='vendor_id'
                                className={classes.input}
                                onChange={(e) => handleOnChange(e)}>
                                {
                                    vendors.map(vendor => {
                                        return <option value={vendor.id} key={vendor.id}>{vendor.full_name}</option>
                                    })
                                }
                            </select>
                            <button onClick={() => setShowVendor(true)} className='p-2 ml-1 shadow-md duration-150 -mb-10 bg-gray-200 rounded-xl hover:bg-gray-300'>
                                {<icons.Plus />}
                            </button>
                        </div>
                        <label className={classes.label}>Vendor</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                        <div className="flex items-center">
                            <select
                                value={data.category_id}
                                name='category_id'
                                className={classes.input}
                                onChange={(e) => handleOnChange(e)}>
                                {
                                    categories.map(category => {
                                        return <option value={category.id} key={category.id}>{category.name}</option>
                                    })
                                }
                            </select>
                            <button onClick={() => setShowCategory(true)} className='p-2 ml-1 shadow-md duration-150 -mb-10 bg-gray-200 rounded-xl hover:bg-gray-300'>
                                {<icons.Plus />}
                            </button>
                        </div>

                        <label className={classes.label}>Category</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                        <input type="text"
                            name='name'
                            className={classes.input}
                            value={data.name}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                        <label className={classes.label}>Product name</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                        <input type="text"
                            name='quantity'
                            className={classes.input}
                            value={data.quantity}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                        <label className={classes.label}>Quantity</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                        <select
                            value={data.unit}
                            name='unit'
                            className={classes.input}
                            onChange={(e) => handleOnChange(e)}>
                            <option value='kg' >Kg</option>
                            <option value='metre'>Metre</option>
                            <option value='litre'>Litre</option>
                            <option value='unit'>Unit</option>

                        </select>
                        <label className={classes.label}>Unit</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                        <input type="text"
                            name='nbr_products'
                            className={classes.input}
                            value={data.nbr_products}
                            onChange={(e) => handleOnChange(e)}
                            placeholder=" " />
                        <label className={classes.label}>Number of products</label>
                    </div>
                </div>
                <button onClick={() => handleOnSubmit()} className={`${!product ? 'blue-button' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                    {<icons.Save />}
                    <div className='ml-1'>Save</div>
                </button>
            </div>
        </div>
    )
}

export default Product