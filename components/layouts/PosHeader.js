import React from 'react'
import { Button } from '../parts'
import icons from '@/data/iconsComponents'
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";
function PosHeader() {
    const router = useRouter();
    const {t}= useTranslation();
    return (
        <div className="w-full min-h-[56px] bg-green-500 flex items-center justify-between px-4">
            <Button title="Back to list"
                className="hovered-yellow-button"
                onClickHandler={() => router.push('/dashboard/pos')}
                parentStyle={{ width: '200px' }}
                icon={<icons.Back />}
                style={{ color: 'white', margin: '0' }}
            />
            <h1 className='text-2xl text-white uppercase font-bold '>
                {t('common:pages.pos')}
            </h1>
            <Button title="Back to dashboard"
                className="hovered-yellow-button"
                onClickHandler={() => router.push('/dashboard')}
                parentStyle={{ width: '200px' }}
                icon={<icons.Back />}
                style={{ color: 'white', margin: '0' }} />
        </div>
    )
}

export default PosHeader