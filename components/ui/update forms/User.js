import React, { useRef, useState } from 'react'
import icons from '@/data/iconsComponents';
import { addService, updateService } from '@/services';
import Select from 'react-select'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '@/utils/toast-update';
import { useRouter } from 'next/router';
import { FormHeader, FormItemsContainer, RequestLoader, Toast } from '@/components/parts';
import { useMainStore } from '@/store/MainStore';
import { useAuthStore } from '@/store/authStore';
import useTranslation from 'next-translate/useTranslation';
import useFocus from '@/hooks/useAutoFocus';
function User({ targetUser = null }) {
    const { t } = useTranslation();
    const { user } = useAuthStore(state => state);
    const router = useRouter();
    const [data, setData] = useState(targetUser ? targetUser : {
        name: '',
        email: '',
        password: '',
        role_id: '0'
    });
    const [isLoading, setIsLoading] = useState(false);
    const { roles } = useMainStore(state => state)
    const focusRef = useRef();
    useFocus(focusRef)
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
        setTimeout(() => {
            router.push('/dashboard/users');
        }, 1500);
    }
    console.log(roles)
    return (
        <div className="flex flex-col">
            {isLoading && <RequestLoader />}
            <Toast />
            <FormItemsContainer>
                <div className="form-content">
                    <div className="flex flex-col">
                        <div className="items-container">
                            <div className="input-container">
                                <label className='label'>{t('common:info.name')}</label>
                                <input type="text"
                                    name='name'
                                    className='input-rounded'
                                    value={data.name}
                                    ref={focusRef}
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder=" " />
                            </div>
                            <div className="input-container">
                                <label className='label'>{t('common:info.email')}</label>
                                <input type="text"
                                    className='input-rounded'
                                    name='email'
                                    value={data.email}
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder=" " />
                            </div>
                        </div>
                        <div className="items-container">
                            {!targetUser && <div className="input-container">
                                <label className='label'>{t('common:info.password')}</label>
                                <input type="text"
                                    className='input-rounded'
                                    name='password'
                                    value={data.password}
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder=" " />
                            </div>}
                            <div className="input-container">
                                <label className="label">{t('common:models.role')}</label>
                                {/* <Select options={roles}
                                    value={roles.find(r => r.value == data.role_id) || roles[0]}
                                    onChange={v => setData({ ...data, role_id: v.value })}
                                /> */}
                                <select name="role_id" className="input-rounded" value={data.role_id} onChange={e => handleOnChange(e)}>
                                    {roles.map(role => <option key={role.value} value={role.value}>{role.label}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => handleOnSubmit()} className={`${!targetUser ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                        {<icons.Save />}
                        <div className='ml-1'>Save</div>
                    </button>
                </div>
            </FormItemsContainer>
        </div>
    )
}

export default User