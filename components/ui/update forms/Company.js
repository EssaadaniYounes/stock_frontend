import React, { useRef, useState } from 'react'
import icons from '../../../data/iconsComponents';
import { addService, updateService } from '../../../services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastDone from '../../../utils/toast-update';
import { useRouter } from 'next/router';
import { FormHeader, FormItemsContainer, RequestLoader, Toast } from '../../parts';
import useTranslation from 'next-translate/useTranslation';
import { useAuthStore } from '../../../store/authStore';
import useFocus from '../../../hooks/useAutoFocus'
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
    const [isLoading, setIsLoading] = useState(false);
    const focusRef = useRef();
    useFocus(focusRef)
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
        setIsLoading(true);
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
        setIsLoading(false);
        setTimeout(() => {
            router.push('/dashboard/companies/details');
        }, 1500);
    }

    return (
        <div className="flex flex-col">
            {isLoading && <RequestLoader />}
            <Toast />
            <FormItemsContainer>
                <FormHeader title={t('common:models.company')} isEdit={company} />
                <div className="form-content">
                    <div className='w-full flex flex-wrap gap-x-2'>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.company_name')}</label>
                            <input type="text"
                                name='company_name'
                                ref={focusRef}
                                className='input-rounded'
                                value={data.company_name}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.tel')}</label>
                            <input type="text"
                                name='tel'
                                className='input-rounded'
                                value={data.tel}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.mobile')}</label>
                            <input type="text"
                                name='mobile'
                                className='input-rounded'
                                value={data.mobile}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        {/* <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className='label'>{t('common:info.tax_number')}</label>
                    <input type="text"
                        name='tax_number'
                        className='input-rounded'
                        value={data.tax_number}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div> */}
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.manager')}</label>
                            <input type="text"
                                name='manager'
                                className='input-rounded'
                                value={data.manager}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.fax')}</label>
                            <input type="text"
                                name='fax'
                                className='input-rounded'
                                value={data.fax}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.email')}</label>
                            <input type="text"
                                name='email'
                                className='input-rounded'
                                value={data.email}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.website')}</label>
                            <input type="text"
                                name='website'
                                className='input-rounded'
                                value={data.website}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.zip_code')}</label>
                            <input type="text"
                                name='zip_code'
                                className='input-rounded'
                                value={data.zip_code}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.city')}</label>
                            <input type="text"
                                name='city'
                                className='input-rounded'
                                value={data.city}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.address')}</label>
                            <input type="text"
                                name='address'
                                className='input-rounded'
                                value={data.address}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.bank_name')}</label>
                            <input type="text"
                                name='bank_name'
                                className='input-rounded'
                                value={data.bank_name}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.bank_account')}</label>
                            <input type="text"
                                name='bank_account'
                                className='input-rounded'
                                value={data.bank_account}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.bank_swift_code')}</label>
                            <input type="text"
                                name='bank_swift_code'
                                className='input-rounded'
                                value={data.bank_swift_code}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.bank_iban')}</label>
                            <input type="text"
                                name='bank_iban'
                                className='input-rounded'
                                value={data.bank_iban}
                                onChange={(e) => handleOnChange(e)}
                                placeholder=" " />
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                            <label className='label'>{t('common:info.logo')}</label>
                            <input type="file"
                                name='logo'
                                className={'input-rounded h-[42px]'}
                                onChange={(e) => { setImage(e.target.files) }}
                                placeholder=" " />
                        </div>
                    </div>
                    <button onClick={() => handleOnSubmit()} className={`${!company ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                        {<icons.Save />}
                        <div className='ml-1'>{t('common:actions.save')}</div>
                    </button>
                </div>
            </FormItemsContainer>
        </div>
    )
}

export default Company