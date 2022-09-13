import React, { useEffect, useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '../../../utils/toast-update';
import { useRouter } from 'next/router';
import { Toast } from '../../parts';
import { useMainStore } from '../../../store/MainStore';
import { useAuthStore } from '../../../store/authStore';
function User({ targetUser = null }) {
    const { user } = useAuthStore(state => state);
    const router = useRouter();
    const [data, setData] = useState(targetUser ? targetUser : {
        name: '',
        email: '',
        password: '',
        role_id: '0'
    });
    const { roles } = useMainStore(state => state)
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async () => {
        const id = toast.loading("Please wait...")
        let res;
        let message;
        if (targetUser) {
            res = await updateService('users', targetUser.id, data);
            message = "User updated successfully";

        }
        else {
            res = await addService('register', { ...data, company_id: user.data.company_id });
            message = "User added successfully";
        }
        ToastDone(message, id, res);
        setTimeout(() => {
            router.push('/dashboard/users');
        }, 1500);
    }

    return (
        <div className="flex flex-col">
            <Toast />
            <div className='w-full flex flex-wrap gap-x-2'>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <input type="text"
                        name='name'
                        className={classes.input}
                        value={data.name}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>Name</label>
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
                {!targetUser && <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className={classes.input}
                        name='password'
                        value={data.password}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                    <label className={classes.label}>Password</label>
                </div>}
                <div className="relative z-0 mb-6 w-full md:w-[49%] group">
                    <select className={classes.input} name="role_id" value={data.role_id} onChange={(e) => handleOnChange(e)}>
                        <option value="0" disabled>Select a role</option>
                        {roles.map(role => <option value={role.id} key={role.id}>{role.role_name}</option>)}
                    </select>
                    <label className={classes.label}>Role name</label>
                </div>

            </div>
            <button onClick={() => handleOnSubmit()} className={`${!targetUser ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                {<icons.Save />}
                <div className='ml-1'>Save</div>
            </button>
        </div>
    )
}

export default User