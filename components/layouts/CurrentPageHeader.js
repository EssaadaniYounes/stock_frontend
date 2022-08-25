import React from 'react';
import { useRouter } from 'next/router';
import { useSharedVariableStore } from '../../store/sharedVariablesStore';

function CurrentPageHeader({ icon: Icon, title, component: Component = null }) {

    const router = useRouter();
    
    return (
        <div className={`max-w-[100vw] z-10 bg-slate-50 pl-3 pr-10 sticky top-0 shadow-md h-12 flex items-center justify-between`}>

            <div className="flex gap-x-8">
                
                <div className='flex items-center gap-x-2'>
                    {Icon && <Icon />}
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