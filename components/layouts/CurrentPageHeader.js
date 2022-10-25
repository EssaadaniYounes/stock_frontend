import React from 'react';
import { useRouter } from 'next/router';
import icons from '@/data/iconsComponents';
import useTranslation from 'next-translate/useTranslation';
import { useSharedVariableStore } from '@/store/sharedVariablesStore';
function CurrentPageHeader({ icon: Icon, title, component: Component = null, showBack = true }) {
    const { t } = useTranslation()
    const router = useRouter();
    const {showSideBar}= useSharedVariableStore(state => state)
    return (
        <div className={`max-w-[100vw] z-10 bg-slate-50 px-[10px] sticky top-0 shadow-md h-12 flex items-center justify-between`}>
            <div className="flex justify-between items-center gap-x-4">
                <div className='flex items-center gap-x-2'>
                    {Icon && <Icon />}
                    <div className='text-lg font-semibold'>
                        {title}
                    </div>
                </div>

            </div>
            <div className='flex items-center gap-x-2'>
                {Component && <Component />}
                {
                    showBack && <button onClick={() => router.back()} className='flex gap-x-2 button-back'>
                        {<icons.Back />}
                        {t('common:actions.back')}
                    </button>
                }
            </div>
        </div>
    )
}

export default CurrentPageHeader