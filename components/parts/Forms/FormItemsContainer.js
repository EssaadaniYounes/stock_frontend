import React from 'react'

function FormItemsContainer({ children }) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}

export default FormItemsContainer