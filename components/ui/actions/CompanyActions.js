import React from 'react'
import icons from '../../../data/iconsComponents'
import { LinkButton } from '../../parts'

function CompanyActions() {
    return (
        <div className='flex items-center justify-end'>

            <LinkButton href='/dashboard/companies/update' icon={<icons.Edit />} className="button-add mt-2" title="Update" />
        </div>
    )
}

export default CompanyActions