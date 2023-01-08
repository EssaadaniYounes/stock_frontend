import React from 'react'

function Button({ onClickHandler, title, icon: Icon, className, style, parentStyle }) {
    return (
        <button onClick={() => onClickHandler()} className={'w-full'} style={parentStyle} >
            <a className={className + " flex items-center mt-2 gap-x-2"} style={style}>
                {Icon}
                {title}
            </a>
        </button>
    )
}

export default Button