import React, { useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
const classes = {
    label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300',
    input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',

}
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '../../../utils/toast-update';
import { useRouter } from 'next/router';
import { Toast } from '../../parts';
import useTranslation from 'next-translate/useTranslation';
import { useAuthStore } from '../../../store/authStore';
function Company({ company = null }) {
    const router = useRouter();
    const { user, setUser } = useAuthStore(state => state)
    const { t } = useTranslation();
    const [data, setData] = useState(company ? company : {
        company_name: ' ',
        tel: ' ',
        mobile: ' ',
        tax_number: 20,
        manager: ' ',
        fax: ' ',
        email: ' ',
        website: ' ',
        zip_code: ' ',
        city: ' ',
        address: ' ',
        bank_name: ' ',
        bank_account: ' ',
        bank_swift_code: ' ',
        bank_iban: ' ',
        logo: ' ',
        init_user_id: ' ',
    });
    const [image, setImage] = useState(null);
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('logo', file[0]);
        const data = await addService('companies/store_imgs', formData);
        return process.env.NEXT_PUBLIC_MAIN_URL + '/images/companies/' + data.file;
    }
    const handleOnSubmit = async () => {

        const id = toast.loading("Please wait...")

        const logo_name = image ? await uploadImage(image) : data.logo;
        if (company) {
            const res = await updateService('companies', company.id, { ...data, logo: logo_name });
            ToastDone("Company updated successfully", id, res);
            setUser({ ...user, data: { ...data, company_name: data.company_name } });
        }
        else {
            const res = await addService('companies', { ...data, logo: logo_name });
            ToastDone("Company added successfully", id, res);
        }
        setTimeout(() => {
            router.push('/dashboard/companies/details');
        }, 1500);
    }

    return (
        <div className="flex flex-col">
            <Toast />
            <div className='w-full flex flex-wrap gap-x-2'>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.company_name')}</label>
                    <input type="text"
                        name='company_name'
                        className={classes.input}
                        value={data.company_name}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.tel')}</label>
                    <input type="text"
                        name='tel'
                        className={classes.input}
                        value={data.tel}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.mobile')}</label>
                    <input type="text"
                        name='mobile'
                        className={classes.input}
                        value={data.mobile}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                {/* <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.tax_number')}</label>
                    <input type="text"
                        name='tax_number'
                        className={classes.input}
                        value={data.tax_number}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div> */}
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.manager')}</label>
                    <input type="text"
                        name='manager'
                        className={classes.input}
                        value={data.manager}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.fax')}</label>
                    <input type="text"
                        name='fax'
                        className={classes.input}
                        value={data.fax}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.email')}</label>
                    <input type="text"
                        name='email'
                        className={classes.input}
                        value={data.email}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.website')}</label>
                    <input type="text"
                        name='website'
                        className={classes.input}
                        value={data.website}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.zip_code')}</label>
                    <input type="text"
                        name='zip_code'
                        className={classes.input}
                        value={data.zip_code}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.city')}</label>
                    <input type="text"
                        name='city'
                        className={classes.input}
                        value={data.city}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.address')}</label>
                    <input type="text"
                        name='address'
                        className={classes.input}
                        value={data.address}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.bank_name')}</label>
                    <input type="text"
                        name='bank_name'
                        className={classes.input}
                        value={data.bank_name}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.bank_account')}</label>
                    <input type="text"
                        name='bank_account'
                        className={classes.input}
                        value={data.bank_account}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.bank_swift_code')}</label>
                    <input type="text"
                        name='bank_swift_code'
                        className={classes.input}
                        value={data.bank_swift_code}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.bank_iban')}</label>
                    <input type="text"
                        name='bank_iban'
                        className={classes.input}
                        value={data.bank_iban}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>{t('common:info.logo')}</label>
                    <input type="file"
                        name='logo'

                        className={classes.input + ' h-[42px]'}
                        onChange={(e) => { setImage(e.target.files) }}
                        placeholder=" " />
                </div>
            </div>
            <button onClick={() => handleOnSubmit()} className={`${!company ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                {<icons.Save />}
                <div className='ml-1'>{t('common:actions.save')}</div>
            </button>
        </div>
    )
}

export default Company