import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import React from 'react'
import image from '../../public/logo.jpeg'
import { CurrentPageHeader } from '../../components/layouts'
import icons from '../../data/iconsComponents'
function index() {
    const { t } = useTranslation()
    return (
        <div className='relative'>
            <CurrentPageHeader icon={icons.DashBoard} title={t('common:pages.home')} />
            <div className='relative flex items-center justify-center'>
                <Image src={image} width={500} height={350} alt='Logo' priority />
            </div>
        </div>
    )
}

export default index