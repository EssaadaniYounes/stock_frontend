import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link'
import React from 'react'
import icons from '../../../data/iconsComponents'
import { LinkButton } from '../../parts'

function ProductActions() {
    const { t } = useTranslation();
    return (
        <div className='flex items-center'>
            <LinkButton href='/dashboard/products/add' icon={<icons.Add />} className="button-add mt-2" title={t('common:actions.add')} />
        </div>
    )
}

export default ProductActions