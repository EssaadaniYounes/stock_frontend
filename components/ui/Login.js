import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { fetch } from '@/lib/fetch';
import { useAuthStore } from '@/store/authStore';
import setCookie from '@/utils/set-cookies';
import useTranslation from 'next-translate/useTranslation';
import useFocus from '@/hooks/useAutoFocus';
// import { Field, Form, Formik, useFormik } from 'formik';
function Login() {
    const router = useRouter();
    const { t } = useTranslation()
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const { setUser, user } = useAuthStore(state => state);
    const focusRef = useRef();
    useFocus(focusRef)
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    const handleClick = async () => {
        const userData = await fetch('login', {
            method: 'POST',
            data: data
        });
        if (userData.success) {
            setCookie('token', userData.token, 30);
            setCookie('user', JSON.stringify(data), 30);
            setCookie('company', userData.data.company_name, 30);
            setUser(userData);
            setError(null);
            router.push('/dashboard');
        }
        else {
            setError(userData.error);
        }
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[300px] md:w-[360px] h-[300px] overflow-hidden bg-gray-200 rounded-md shadow-sm mt-10'>
                <div>
                    <div className='text-center text-white text-2xl font-semibold bg-black py-2'>
                        {t('common:login.title')}
                    </div>
                    <div className='px-2 py-4 flex flex-col items-center'>
                        <div className='relative mb-6 w-[285px] group'>
                            <input type="email"
                                name='email'
                                ref={focusRef}
                                className='block py-2.5 px-0 w-full text-[18px] text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                value={data.email}
                                onChange={(e) => handleChange(e)}
                                placeholder={t('common:info.email')} required />
                        </div>
                        <div className='relative mb-6 w-[285px] group'>
                            <input type="password"
                                name='password'
                                className='block py-2.5 px-0 w-full text-[18px] text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                value={data.password}
                                onChange={(e) => handleChange(e)}
                                placeholder={t('common:info.password')} />
                        </div>
                        {
                            error && <div className="text-red-500 mb-3 duration-150">
                                {error}
                            </div>
                        }
                        <button onClick={() => handleClick()} type="button" className='button-save flex flex-row-reverse items-center gap-x-2'>
                            {t('common:login.log')}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// function Login() {
//     const formik = useFormik({
//         initialValues: {
//             email: '',
//         },
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         },
//     });
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <label htmlFor="email">Email Address</label>
//             <input
//                 id="email"
//                 name="email"
//                 type="text"
//                 onChange={formik.handleChange}
//                 value={formik.values.email} />

//             <button type="submit">Submit</button>
//         </form>)
// }

export default Login