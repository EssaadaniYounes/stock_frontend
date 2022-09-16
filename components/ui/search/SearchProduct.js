import React, { useEffect, useState } from 'react'
import icons from '../../../data/iconsComponents'
import useSearch from '../../../hooks/useSearch';
import { useMainStore } from '../../../store/MainStore'
import { SearchHeader } from '../../parts';
const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-[200px] text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function SearchProduct({ allProducts }) {
    const { setProducts } = useMainStore(state => state);
    const [searchItems, setSearchItems] = useState({
        barcode: '',
        unit_name: '',
        vendor_name: '',
        category_name: '',
        name: ''
    })

    const callBack = (product) => {
        return (product.barcode.toLowerCase().includes(searchItems.barcode) &&
            product.unit_name.toLowerCase().includes(searchItems.unit_name) &&
            product.vendor_name.toLowerCase().includes(searchItems.vendor_name) &&
            product.category_name.toLowerCase().includes(searchItems.category_name) &&
            product.name.toLowerCase().includes(searchItems.name))
    }
    useSearch(callBack, setProducts, searchItems, allProducts);

    const handleOnChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setSearchItems(prev => ({ ...prev, [name]: value.toLowerCase() }));
    }


    return (
        <div className='search-box'>
            <SearchHeader />
            <div className='search-body'>

                <div className="relative z-0 mb-6 group">
                    <input type="text"
                        name="barcode"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Barcode</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text"
                        name='name'
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Product name</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text"
                        name="vendor_name"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Vendor name</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text"
                        name="category_name"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Category name</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text"
                        name="unit_name"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Unit</label>
                </div>
            </div>
        </div>
    )
}

export default SearchProduct