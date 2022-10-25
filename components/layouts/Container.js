import React, { useEffect } from 'react'
import { SharedHeader, SideBar, Overlay } from './'
import { useRouter } from 'next/router'
import { useSharedVariableStore } from '@/store/sharedVariablesStore'
import useTranslation from 'next-translate/useTranslation'
function Container(props) {
    const router = useRouter()
    const { lang } = useTranslation()
    const { showSideBar, setShowSideBar } = useSharedVariableStore(state => state)
    return (
        <div dir={`${lang != "ar" ? 'ltr' : 'rtl'}`} className='flex flex-col items-start justify-start'>

            <SharedHeader />
            <div className="w-full h-screen flex  mt-14 relative">
                {router.pathname != '/auth/login' && showSideBar && <SideBar />}
                {showSideBar && <Overlay />}
                <div className={`${showSideBar ? 'ltr:md:ml-[180px] rtl:md:mr-[180px]' : ''} w-full`}>
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default Container