import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSharedVariableStore } from '../../store/sharedVariablesStore';
import { useAuthStore } from '../../store/authStore';
import icons from '../../data/iconsComponents';
import deleteAllCookies from '../../utils/clear-cookies';
import { DropDown } from '../parts';
import useTranslation from 'next-translate/useTranslation';

function SharedHeader() {

    const router = useRouter();
    const { lang, t } = useTranslation();
    const { user, setUser } = useAuthStore((state) => state);
    const [currentUser, setCurrentUser] = useState({
        token: '',
        data: {
            name: null
        }
    })
    const [showLogout, setShowLogout] = useState(false);
    const { showSideBar, setShowSideBar } = useSharedVariableStore(state => state);

    useEffect(() => {
        setCurrentUser(user);
    }, []);

    const handleToggleSideBar = () => {
        setShowSideBar(!showSideBar);
    }

    const handleLogout = () => {
        const cookiesDeleted = deleteAllCookies();
        if (cookiesDeleted) {
            setUser(null);
            setShowSideBar(false)
            router.push('/auth/login');
        }
    }


    return (
        <div className='w-full relative h-14 bg-[#343d4a] flex justify-between  px-8 items-center'>
            <div className='flex gap-x-6 '>
                <div className='text-white uppercase text-2xl font-semibold'>Stock App</div>
                <div>
                    {/* Show Toggle icon if we are logged in */}
                    {router.pathname != '/login' &&
                        <div className='bg-white shadow-md p-2 rounded-full cursor-pointer' onClick={() => handleToggleSideBar()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                    }
                </div>

            </div>
            <div className="flex items-center gap-x-3">
                <DropDown />
                {currentUser?.data?.name && <div onClick={() => setShowLogout(!showLogout)} className="flex items-center gap-x-2 font-semibold cursor-pointer duration-150 hover:text-gray-300 text-white uppercase">
                    <p>{<icons.UserProfile />}</p>
                    <p>{currentUser.data.name}</p>
                    {<icons.ArrowDown />}
                </div>}
            </div>
            {showLogout && <div className={`absolute ${lang != "ar" ? ' right-0 ' : ' left-0 '} font-semibold top-14 w-[200px] h-[70px] rounded-b-lg duration-150 hover:bg-gray-200 flex items-center justify-center z-[11] bg-gray-300`}>
                <button className='flex items-center gap-x-1 cursor-pointer' onClick={() => handleLogout()}>
                    {<icons.Logout />}
                    {t('common:login.logout')}
                </button>
            </div>}
        </div >
    )
}

export default SharedHeader