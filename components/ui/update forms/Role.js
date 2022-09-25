import React, { useState } from 'react'
import { toast } from 'react-toastify';

import icons from '../../../data/iconsComponents';
import roles from '../../../data/roles'
import { useRouter } from 'next/router'
import { addService, updateService } from '../../../services'
import isPermissionChecked from '../../../utils/is-permission-checked';
import ToastDone from '../../../utils/toast-update';
import { Toast } from '../../parts';
import useTranslation from 'next-translate/useTranslation';
const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function Role({ role = null }) {
    const { t } = useTranslation();
    const [data, setRole] = useState(role
        ? { role_name: role.role_name, permissions: JSON.parse(role.permissions) }
        : { role_name: '', permissions: {} }
    )
    const router = useRouter();
    const handleCheckBox = (e, permission) => {
        if (e.target.checked) {
            const per = data.permissions;
            per[permission] = typeof data.permissions[permission] == 'undefined' ? [] : data.permissions[permission];
            per[permission].push(e.target.name)
            setRole({ ...data, permissions: per });
        }
        else {
            //remove action from permissions of the permission
            const per = data.permissions;
            per[permission] = data.permissions[permission].filter(action => action !== e.target.name);
            setRole({ ...data, permissions: per });
        }
    }

    const handleSubmit = async () => {
        const id = toast.loading("Please wait...")
        if (role) {
            const res = await updateService('roles', role.id, {
                role_name: data.role_name,
                permissions: JSON.stringify(data.permissions),
            });
            ToastDone("Role updated successfully", id, res);

        }
        else {
            const res = await addService('roles', {
                role_name: data.role_name,
                permissions: JSON.stringify(data.permissions),
            });
            ToastDone("Role added successfully", id, res);
        }
        setTimeout(() => {
            router.push('/dashboard/roles');
        }, 1500);
    }
    return (
        <>

            <Toast />
            <div className="relative z-0 mb-6 w-full  group">
                <input type="text"
                    className={classes.input}
                    value={data.role_name}
                    onChange={(e) => setRole({ ...data, role_name: e.target.value })}
                    placeholder=" " />
                <label className={classes.label}>{ t('common:info.name') }</label>
            </div>
            {
                Object.keys(roles).map(r => {
                    return (
                        <div key={r} className='flex items-center mt-2 border-b pb-2 '>
                            <h3 className='text-[17px] font-semibold w-[100px] capitalize'>{t(`common:pages.${r}`)} :</h3>
                            <ul className='flex items-center justify-between w-[calc(100%-100px)] '>
                                {
                                    roles[r].map(action => {

                                        return (
                                            <li key={action} className='flex flex-wrap '>
                                                <input type='checkbox'
                                                    className="w-6 h-6"
                                                    checked={isPermissionChecked(data.permissions, r, action)}
                                                    onChange={(e) => { handleCheckBox(e, r) }}
                                                    name={action}
                                                    id={r + '_' + action} />
                                                <label htmlFor={r + '_' + action} className=' cursor-pointer pb-1 mx-2 text-[18px] capitalize'>
                                                    {t(`common:actions.${action}`)}
                                                </label>
                                            </li>
                                        )
                                    }

                                    )
                                }
                            </ul>
                        </div>
                    )


                })}
            <button onClick={() => handleSubmit()} className={`${!role ? 'button-save' : 'yellow-button'} max-w-[120px] mt-4 flex items-center mx-auto`}>
                {<icons.Save />}
                <div className='ml-1'>
                    {t('common:actions.save')}
                </div>
            </button>
        </>
    )
}

export default Role