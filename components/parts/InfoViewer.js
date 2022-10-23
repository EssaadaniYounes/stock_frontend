import React from 'react'

function InfoViewer({ title, value }) {
    return (
        <div className="flex">
            <span className="font-semibold">{title} :</span>
            <span>{value}</span>
        </div>
    )
}

export default InfoViewer