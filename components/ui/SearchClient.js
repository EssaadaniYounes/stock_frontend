import React from 'react'
import icons from '../../data/iconsComponents'
import { useMainStore } from '../../store/MainStore'
const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-[200px] text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function SearchClient() {
    const { setClients, clients } = useMainStore(state => state);
    const onClickHandler = () => {
    }

    return (
        <div className='w-[calc(100%-2rem)] flex flex-col min-h-[140px] mx-auto mt-2 border rounded-md overflow-hidden border-blue-400'>
            <div className='w-full h-8 flex items-center justify-start gap-x-2 text-white font-semibold bg-gray-800 p-2'>
                <div className='w-5 h-5'>{<icons.Search />}</div>
                Search
            </div>
            <div className='p-2 px-6 flex justify-between flex-wrap'>

                <div className="relative z-0 mb-6 group">
                    <input type="text" placeholder=' ' className={classes.input} />
                    <label htmlFor="" className={classes.label}>Name</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text" placeholder=' ' className={classes.input} />
                    <label htmlFor="" className={classes.label}>City</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text" placeholder=' ' className={classes.input} />
                    <label htmlFor="" className={classes.label}>Phone</label>
                </div>
                <div className="relative z-0 mb-6 group">
                    <input type="text" placeholder=' ' className={classes.input} />
                    <label htmlFor="" className={classes.label}>Email</label>
                </div>
            </div>
        </div>
    )
}

export default SearchClient