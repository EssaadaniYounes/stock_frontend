import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import icons from '../../../data/iconsComponents'
import { LinkButton } from '../../parts'

function CompanyActions() {
    const { t } = useTranslation();
    return (
        <div className='flex items-center justify-end'>

            <LinkButton href='/dashboard/companies/update' icon={<icons.Edit />} className="button-add mt-2" title={t('common:actions.update')} />
        </div>
    )
}

export default CompanyActions