import React from 'react'

function Error({ error }) {
    return (
        <span className="text-[10px] font-semibold text-red-500">
            {error ?? error}
        </span>
    )
}

export default Error