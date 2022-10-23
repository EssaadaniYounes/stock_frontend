import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

import icons from '../../../data/iconsComponents';
import roles from '../../../data/roles'
import { useRouter } from 'next/router'
import { addService, updateService } from '../../../services'
import isPermissionChecked from '../../../utils/is-permission-checked';
import ToastDone from '../../../utils/toast-update';
import { FormHeader, FormItemsContainer, RequestLoader, Toast } from '../../parts';
import useTranslation from 'next-translate/useTranslation';
import useFocus from '../../../hooks/useAutoFocus'
function Role({ role = null }) {
    const { t } = useTranslation();
    const [data, setRole] = useState(role
        ? { role_name: role.role_name, permissions: JSON.parse(role.permissions) }
        : { role_name: '', permissions: {} }
    )
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const focusRef = useRef();
    useFocus(focusRef)
    const handleSelectAll = (e) => {
        if (e.target.checked) return setRole({ ...data, permissions: roles });
        return setRole({ ...data, permissions: {} });
    }
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
      
        setIsLoading(true);
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
        setIsLoading(false);
        setTimeout(() => {
            router.push('/dashboard/roles');
        }, 1500);
    }
    return (
        <>
            {isLoading && <RequestLoader />}
            <Toast />
            <FormItemsContainer>
                <FormHeader title={t('common:models.role')} isEdit={role} />
                <div className="form-content">
                    <div className="relative z-0 mb-6 w-full  group">
                        <label className='label'>{t('common:info.name')}</label>
                        <input type="text"
                            className='input-rounded'
                            value={data.role_name}
                            ref={focusRef}
                            onChange={(e) => setRole({ ...data, role_name: e.target.value })}
                            placeholder=" " />
                    </div>
                    <div className="flex items-center justify-end gap-x-2 mb-4 ltr:pr-[10px]">
                        <input type="checkbox" id="all" className="w-6 h-6" checked={data.permissions == roles} onChange={(e) => handleSelectAll(e)} />
                        <label htmlFor="all" className='cursor-pointer pb-1 mx-2 text-[18px] capitalize'>{t('common:actions.select_all')}</label>
                    </div>
                    {
                        Object.keys(roles).map(r => {
                            return (
                                <div key={r} className='flex items-center mt-2 border-b pb-2 '>
                                    <h3 className='text-[10px] md:text-[15px] font-medium w-[115px] capitalize'>{t(`common:pages.${r}`)} :</h3>
                                    <ul className='flex items-center justify-between w-[calc(100%-100px)] '>
                                        {
                                            roles[r].map(action => {

                                                return (
                                                    <li key={r + '_' + action} className='flex flex-wrap '>
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
                </div>
            </FormItemsContainer>
        </>
    )
}

export default Role