import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link'
import React from 'react'
import icons from '@/data/iconsComponents'
import { LinkButton } from '@/components/parts'

function RoleActions() {
    const { t } = useTranslation();
    return (
        <div className='flex items-center justify-end'>

            <LinkButton href='/dashboard/roles/add' icon={<icons.Add />} className="button-add mt-2" title={t('common:actions.add')} />
        </div>
    )
}

export default RoleActions