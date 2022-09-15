import React from 'react'

function Button({ onClickHandler, title, icon: Icon, className }) {
    return (
        <button onClick={() => onClickHandler()} className={'w-full'}>
            <a className={className + " flex items-center mt-2 gap-x-2"}>
                {Icon}
                {title}
            </a>
        </button>
    )
}

export default Button