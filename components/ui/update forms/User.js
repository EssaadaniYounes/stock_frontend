import React, { useEffect, useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
import Select from 'react-select'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '../../../utils/toast-update';
import { useRouter } from 'next/router';
import { Toast } from '../../parts';
import { useMainStore } from '../../../store/MainStore';
import { useAuthStore } from '../../../store/authStore';
import useTranslation from 'next-translate/useTranslation';
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
            <div className="flex flex-col">
                <div className="two-items-container">
                    <div className="input-container">
                        <label className='label'>{t('common:info.name')}</label>
                        <input type="text"
                            name='name'
                            className='input-rounded'
                            value={data.name}
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
                <div className="two-items-container">
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
                        <Select options={roles}
                            value={roles.find(r => r.value == data.role_id) || roles[0]}
                            onChange={v => setData({ ...data, role_id: v.value })}
                        />
                    </div>
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