import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import icons from '../../../data/iconsComponents'
import { LinkButton } from '../../parts'

function ClientActions() {
    const {t}= useTranslation()
    return (
        <div className='flex items-center justify-end'>
            
            <LinkButton href='/dashboard/clients/add' icon={<icons.Add />} className="button-add mt-2" title={t('common:actions.add')} />
        </div>
    )
}

export default ClientActions