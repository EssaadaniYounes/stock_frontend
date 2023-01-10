import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link'
import React from 'react'
import icons from '@/data/iconsComponents'
import { LinkButton } from '@/components/parts'

function ProductActions() {
    const { t } = useTranslation();
    return (
        <div className='flex items-center gap-x-2'>
            <LinkButton href='/dashboard/products/add' icon={<icons.Add />} className="button-add mt-2" title={t('common:actions.add')} />
            <LinkButton href='/dashboard/products/import' icon={<icons.Import />} className="text-white mt-2 hover:bg-[#3044b9] font-medium rounded-lg text-sm px-5 py-2.5 mb-2  bg-[#4d66f4]" title={t('common:actions.import')} />
        </div>
        
    )
}

export default ProductActions