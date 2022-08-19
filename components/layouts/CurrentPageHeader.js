import React from 'react';
import { useRouter } from 'next/router';
import { useSharedVariableStore } from '../../store/sharedVariablesStore';

function CurrentPageHeader({ icon: Icon, title, component: Component = null }) {

    const router = useRouter();
    const { showSideBar, setShowSideBar } = useSharedVariableStore(state => state);


    const handleToggleSideBar = () => {
        setShowSideBar(!showSideBar);
    }

    return (
        <div className={`z-10 bg-slate-50 px-10 sticky top-0 shadow-md h-12 flex items-center justify-between`}>

            <div className="flex gap-x-8">
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
                <div className='flex items-center gap-x-2'>
                    <Icon />
                    <div className='text-lg font-semibold'>
                        {title}
                    </div>
                </div>
            </div>
            {Component && <Component />}
        </div>
    )
}

export default CurrentPageHeader