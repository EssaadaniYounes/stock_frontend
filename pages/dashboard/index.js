import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { CurrentPageHeader } from '../../components/layouts'
import icons from '../../data/iconsComponents'
function index() {
    const { t } = useTranslation()
    return (
        <div className=''>
            <CurrentPageHeader icon={icons.DashBoard} title={t('common:pages.home') } />
        </div>
    )
}

export default index