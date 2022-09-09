import Link from 'next/link'
import React from 'react'
import icons from '../../../data/iconsComponents'
import { LinkButton } from '../../parts'

function RoleActions() {
    return (
        <div className='flex items-center justify-end'>

            <LinkButton href='/dashboard/roles/add' icon={<icons.Add />} className="button-add mt-2" title="Add" />
        </div>
    )
}

export default RoleActions