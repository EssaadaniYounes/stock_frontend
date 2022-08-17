import React from 'react'
import {useAuthStore} from '../../store/authStore';

function SharedHeader() {
    return (
        <div className='w-full h-14 bg-gray-600 flex justify-between px-8 items-center'>
            <div className='text-white uppercase text-2xl font-semibold'>Stock App</div>
        </div>
    )
}

export default SharedHeader