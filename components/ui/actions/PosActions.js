import React from 'react'
import useTranslation from 'next-translate/useTranslation';
import icons from '@/data/iconsComponents'
import { LinkButton } from '@/components/parts'

function PosActions() {
    const { t } = useTranslation();
    return (
        <div className='flex items-center justify-end'>

            <LinkButton href='/pos/add' icon={<icons.Add />} className="button-add mt-2" title={t('common:actions.add')} />
        </div>
    )
}

export default PosActions