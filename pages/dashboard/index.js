import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import React from 'react'
import image from '@/public/logo.jpeg'
import { CurrentPageHeader } from '@/components/layouts'
import icons from '@/data/iconsComponents'
import getCookie from '@/utils/get-cookie'
import { fetch } from '@/lib/fetch'
function Index() {
    const { t } = useTranslation()
    return (
        <div className='relative'>
            <div className='relative flex items-center justify-center'>
                <Image src={image} width={500} height={350} alt='Logo' priority />
            </div>
        </div>
    )
}

export default Index