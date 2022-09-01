import React, { useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '../../../utils/toast-update';
import { useRouter } from 'next/router';
function Client({ client = null }) {
    const router = useRouter();
    const [data, setData] = useState(client ? client : {
        full_name: '',
        street: '',
        zip_code: '',
        city: '',
        address: '',
        tel: '',
        email: '',
        ice: ''
    });

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async () => {
        const id = toast.loading("Please wait...")
        if (client) {
            const res = await updateService('clients', client.id, data);
            ToastDone("Client updated successfully", id, res);

        }
        else {
            const res = await addService('clients', data);
            ToastDone("Client added successfully", id, res);
        }
        setTimeout(() => {
            router.push('/dashboard/clients');
        }, 1500);
    }

    return (
        <div className="flex flex-col">
            <ToastContainer position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                transition={Flip}
                pauseOnHover />
            <div className='w-full flex flex-wrap gap-x-2'>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <input type="text"
                        name='full_name'
                        className={classes.input}
                        value={data.full_name}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>Full name</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='email'
                        value={data.email}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>Email</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='tel'
                        value={data.tel}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>Phone</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='street'
                        value={data.street}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>Street</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='zip_code'
                        value={data.zip_code}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>Zip code</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='city'
                        value={data.city}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>City</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='address'
                        value={data.address}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>Address</label>
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='ice'
                        value={data.ice}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>Ice</label>
                </div>
            </div>
            <button onClick={() => handleOnSubmit()} className={`${!client ? 'blue-button' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                {<icons.Save />}
                <div className='ml-1'>Save</div>
            </button>
        </div>
    )
}

export default Client