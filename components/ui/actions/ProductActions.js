import Link from 'next/link'
import React from 'react'
import icons from '../../../data/iconsComponents'
import { LinkButton } from '../../parts'

function ProductActions() {
    return (
        <div className='flex items-center'>
            <LinkButton href='/dashboard/products/add' icon={<icons.Add />} className="button-add mt-2" title="Add" />
        </div>
    )
}

export default ProductActions