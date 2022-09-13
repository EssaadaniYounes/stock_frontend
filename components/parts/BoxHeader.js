import React from 'react'

function BoxHeader({ title, icon: Icon }) {
    return (
        <div className="bg-gray-600 flex items-center gap-x-1 p-2 text-white capitalize font-semibold text-[20px]">
            {<Icon />}
            {title}
        </div>
    )
}

export default BoxHeader