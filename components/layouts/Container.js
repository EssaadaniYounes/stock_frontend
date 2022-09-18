import React, { useEffect } from 'react'
import { SharedHeader, SideBar } from './'
import { useRouter } from 'next/router'
import { useSharedVariableStore } from '../../store/sharedVariablesStore'
import useTranslation from 'next-translate/useTranslation'
function Container(props) {
    const router = useRouter()
    const { lang } = useTranslation()
    const { showSideBar, setShowSideBar } = useSharedVariableStore(state => state)
    return (
        <div dir={`${lang != "ar" ? 'ltr' : 'rtl'}`}>

            <SharedHeader />
            <div className='flex overflow-hidden'>
                {router.pathname != '/auth/login' && <SideBar />}
                <div className={` duration-100 relative 
                ${showSideBar
                        ? 'min-w-[100vw]' :
                        router.pathname != "/auth/login"
                            ? 'w-[calc(100vw-220px)]'
                            : 'min-w-[100vw]'
                    }`}>
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default Container