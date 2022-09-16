import React, { useEffect, useState } from 'react'
import icons from '../../../data/iconsComponents'
import useSearch from '../../../hooks/useSearch';
import { useMainStore } from '../../../store/MainStore'
import { SearchHeader } from '../../parts';
const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block w-full py-2.5 px-0 text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function SearchUnit({ allUnits }) {
    const { setUnits } = useMainStore(state => state);
    const [searchItems, setSearchItems] = useState({
        name: '',
        symbol: ''
    })

    const callBack = (unit) => {
        return (
            unit.name.toLowerCase().includes(searchItems.name) &&
            unit.symbol.toLowerCase().includes(searchItems.symbol)
        )
    }
    useSearch(callBack, setUnits, searchItems, allUnits);

    const handleOnChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setSearchItems(prev => ({ ...prev, [name]: value.toLowerCase() }));
    }


    return (
        <div className='search-box'>
            <SearchHeader />
            <div className='search-body'>
                <div className="relative z-0 mb-6 flex-1 group">
                    <input type="text"
                        name="name"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Unit name</label>
                </div>
                <div className="relative z-0 mb-6 flex-1 group">
                    <input type="text"
                        name="symbol"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Symbol</label>
                </div>
            </div>
        </div>
    )
}

export default SearchUnit