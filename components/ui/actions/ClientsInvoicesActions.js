import Link from 'next/link'
import React from 'react'
import icons from '../../../data/iconsComponents'
import { LinkButton } from '../../parts'

function ClientsInvoicesActions() {
    return (
        <div className='flex items-center'>
            <LinkButton
                href='/dashboard/invoices/add'
                icon={<icons.Add />}
                className='button-add mt-2 ' title='add' />
        </div>
    )
}

export default ClientsInvoicesActions