import React, { useEffect } from 'react'
import { SharedHeader, SideBar } from './'
import { useRouter } from 'next/router'
import { useSharedVariableStore } from '../../store/sharedVariablesStore'
function Container(props) {
    const router = useRouter()
    const { showSideBar, setShowSideBar } = useSharedVariableStore(state => state)
    
    return (
        <div className=''>
            {router.pathname != '/auth/login' && <SharedHeader />}
            <div className='flex overflow-hidden'>
                {router.pathname != '/auth/login' && <SideBar />}
                <div className={` duration-100 relative ${!showSideBar ? 'min-w-[100vw]' : 'w-[calc(100vw-220px)]'}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Container