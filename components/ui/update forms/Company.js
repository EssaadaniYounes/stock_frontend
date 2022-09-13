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
function Company({ company = null }) {
    const router = useRouter();
    const [data, setData] = useState(company ? company : {
        company_name: ' ',
        tel: ' ',
        mobile: ' ',
        tax_number: ' ',
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
        const logo_name = await uploadImage(data.logo);
        if (company) {
            const res = await updateService('companies', company.id, { ...data, logo: logo_name });
            ToastDone("Company updated successfully", id, res);
        }
        else {
            const res = await addService('companies', { ...data, logo: logo_name });
            ToastDone("Company added successfully", id, res);
        }
        // setTimeout(() => {
        //     router.push('/dashboard/clients');
        // }, 1500);
    }

    return (
        <div className="flex flex-col">
            <Toast />
            <div className='w-full flex flex-wrap gap-x-2'>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Company name</label>
                    <input type="text"
                        name='company_name'
                        className={classes.input}
                        value={data.company_name}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Tel</label>
                    <input type="text"
                        name='tel'
                        className={classes.input}
                        value={data.tel}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Mobile</label>
                    <input type="text"
                        name='mobile'
                        className={classes.input}
                        value={data.mobile}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Tax number</label>
                    <input type="text"
                        name='tax_number'
                        className={classes.input}
                        value={data.tax_number}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Manager</label>
                    <input type="text"
                        name='manager'
                        className={classes.input}
                        value={data.manager}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Fax</label>
                    <input type="text"
                        name='fax'
                        className={classes.input}
                        value={data.fax}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Email</label>
                    <input type="text"
                        name='email'
                        className={classes.input}
                        value={data.email}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Website</label>
                    <input type="text"
                        name='website'
                        className={classes.input}
                        value={data.website}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Zip code</label>
                    <input type="text"
                        name='zip_code'
                        className={classes.input}
                        value={data.zip_code}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>City</label>
                    <input type="text"
                        name='city'
                        className={classes.input}
                        value={data.city}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Address</label>
                    <input type="text"
                        name='address'
                        className={classes.input}
                        value={data.address}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Bank name</label>
                    <input type="text"
                        name='bank_name'
                        className={classes.input}
                        value={data.bank_name}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Bank account</label>
                    <input type="text"
                        name='bank_account'
                        className={classes.input}
                        value={data.bank_account}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Bank swift code</label>
                    <input type="text"
                        name='bank_swift_code'
                        className={classes.input}
                        value={data.bank_swift_code}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>Bank iban</label>
                    <input type="text"
                        name='bank_iban'
                        className={classes.input}
                        value={data.bank_iban}
                        onChange={(e) => handleOnChange(e)}
                        placeholder=" " />
                </div>
                <div className="relative z-0 mb-6 w-full md:w-[49%]  group">
                    <label className={classes.label}>logo</label>
                    <input type="file"
                        name='logo'
                        className={classes.input + ' h-[42px]'}
                        onChange={(e) => { setData({ ...data, logo: e.target.files }); }}
                        placeholder=" " />
                </div>
            </div>
            <button onClick={() => handleOnSubmit()} className={`${!company ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                {<icons.Save />}
                <div className='ml-1'>Save</div>
            </button>
        </div>
    )
}

export default Company