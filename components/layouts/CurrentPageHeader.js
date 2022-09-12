import React from 'react';
import { useRouter } from 'next/router';
import { useSharedVariableStore } from '../../store/sharedVariablesStore';
import icons from '../../data/iconsComponents';

function CurrentPageHeader({ icon: Icon, title, component: Component = null }) {

    const router = useRouter();

    return (
        <div className={`max-w-[100vw] z-10 bg-slate-50 pl-3 pr-3 sticky top-0 shadow-md h-12 flex items-center justify-between`}>

            <div className="flex gap-x-8">

                <div className='flex items-center gap-x-2'>
                    {Icon && <Icon />}
                    <div className='text-lg font-semibold'>
                        {title}
                    </div>
                </div>
            </div>
            <div className='flex items-center pr-5'>
                {Component && <Component />}
                <button onClick={() => router.back()} className='flex gap-x-2 button-back'>
                    {<icons.Back />}
                    Back
                </button>
            </div>
        </div>
    )
}

export default CurrentPageHeader