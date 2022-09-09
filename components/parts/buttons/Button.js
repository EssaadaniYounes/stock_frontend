import React from 'react'

function Button({ onClickHandler, title, icon: Icon, className }) {
    return (
        <div>
            <button onClick={() => onClickHandler()}>
                <a className={className + " flex items-center mt-2 gap-x-2"}>
                    {Icon}
                    {title}
                </a>
            </button>
        </div>
    )
}

export default Button