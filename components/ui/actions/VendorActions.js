import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React from 'react'
import icons from '../../../data/iconsComponents'
import { LinkButton } from '../../parts'

function VendorActions() {
    const { t } = useTranslation()
    return (
        <div>
            <div className='flex items-center'>
                <LinkButton
                    href='/dashboard/vendors/add'
                    icon={<icons.Add />}
                    className='button-add mt-2' title={t('common:actions.add')} />
            </div>
        </div>
    )
}

export default VendorActions