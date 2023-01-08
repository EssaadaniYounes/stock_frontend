import Link from 'next/link'
import React from 'react'

const LinkButton=({ className, title, href, icon: Icon, style }) => {
    return (
        <Link href={href}>
            <a className={className}>
                <p className='flex items-center gap-x-2 capitalize' style={style}>
                    {Icon}
                    {title}
                </p>
            </a>
        </Link>
    )
}

export default LinkButton