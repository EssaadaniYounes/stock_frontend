import React from 'react'
import { SharedHeader } from './'

function Container(props) {
    return (
        <div className=''>
            <SharedHeader />
            {props.children}
        </div>
    )
}

export default Container