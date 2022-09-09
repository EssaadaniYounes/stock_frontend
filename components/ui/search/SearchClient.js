import React, { useEffect, useState } from 'react'
import icons from '../../../data/iconsComponents'
import useSearch from '../../../hooks/useSearch';
import { useMainStore } from '../../../store/MainStore'
const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-[200px] text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function SearchClient({ allClients }) {
    const { setClients} = useMainStore(state => state);
    const [searchItems, setSearchItems] = useState({
        full_name: '',
        city: '',
        tel: '',
        email: ''
    })

    const callBack = (client) => {
            return (client.full_name.toLowerCase().includes(searchItems.full_name) &&
                client.city.toLowerCase().includes(searchItems.city) &&
                client.tel.toLowerCase().includes(searchItems.tel) &&
                client.email.toLowerCase().includes(searchItems.email))
    }
    useSearch(callBack, setClients, searchItems, allClients);

    const handleOnChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setSearchItems(prev => ({ ...prev, [name]: value.toLowerCase() }));
    }


    return (
        <div className='search-box'>
            <div className='search-header'>
                <div className='w-5 h-5'>{<icons.Search />}</div>
                Search
            </div>
            <div className='search-body'>

                <div className="relative z-0 mb-6 group">
                    <input type="text"
                        name="full_name"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Name</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text"
                        name='city'
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>City</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text"
                        name="tel"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Phone</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text"
                        name="email"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className={classes.input} />
                    <label htmlFor="" className={classes.label}>Email</label>
                </div>
            </div>
        </div>
    )
}

export default SearchClient