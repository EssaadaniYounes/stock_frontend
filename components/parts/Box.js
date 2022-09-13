import React from 'react'
import { BoxHeader, BoxBody } from './'

function Box({ items = null, title, icon: Icon, children }) {
    return (
        <div className="flex-1 min-h-[220px] min-w-[350px] overflow-hidden shadow-md rounded-md">
            <BoxHeader title={title} icon={Icon} />
            {items && <BoxBody items={items} />}
            {children}
        </div>
    )
}

export default Box