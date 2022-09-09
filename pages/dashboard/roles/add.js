import React, { useState } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import icons from '../../../data/iconsComponents'
import roles from '../../../data/roles'
import { addService } from '../../../services'
const classes = {
    label: 'absolute text-[17px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}

function add() {
    const [role, setRole] = useState({
        role_name: '',
        permissions: {}
    })

    const handleCheckBox = (e, permission) => {
        if (e.target.checked) {
            const per = role.permissions;
            per[permission] = typeof role.permissions[permission] == 'undefined' ? [] : role.permissions[permission];
            per[permission].push(e.target.name)
            setRole({ ...role, permissions: per });
        }
        else {
            //remove action from permissions of the permission
            const per = role.permissions;
            per[permission] = role.permissions[permission].filter(action => action !== e.target.name);
            setRole({ ...role, permissions: per });
        }
    }

    const handleSubmit = async () => {
        const res = await addService('roles', {
            role_name: role.role_name,
            permissions: JSON.stringify(role.permissions)
        });
    }


    return (
        <>

            <CurrentPageHeader icon={icons.Settings} title="Add role" />

            <Form>

                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <input type="text"
                        className={classes.input}
                        value={role.role_name}
                        onChange={(e) => setRole({ ...role, role_name: e.target.value })}
                        placeholder=" " />
                    <label className={classes.label}>Role name</label>
                </div>
                {
                    Object.keys(roles).map(role => {
                        return (
                            <div key={role} className='flex items-center '>
                                <h3 className='text-[17px] font-semibold w-[100px]'>{role} :</h3>
                                <ul className='flex items-center justify-between w-[calc(100%-100px)] '>
                                    {
                                        roles[role].map(action => {
                                            return (
                                                <li key={action} className='flex'>
                                                    <input type='checkbox'
                                                        onChange={(e) => { handleCheckBox(e, role) }}
                                                        name={action}
                                                        id={role + '_' + action} />
                                                    <label htmlFor={role + '_' + action} className=' cursor-pointer pb-1 ml-2 text-[17px]'>
                                                        {action}
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
                <button onClick={() => handleSubmit()} className='button-add mt-4 max-w-[100px]'>
                    {<icons.Save />}
                    Save
                </button>
            </Form>
        </>
    )
}

export default add