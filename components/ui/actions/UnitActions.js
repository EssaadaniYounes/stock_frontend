import React from 'react'
import { useSharedVariableStore } from '../../../store/sharedVariablesStore'

function UnitActions() {
    const { setShowUnit } = useSharedVariableStore();
    const handleOnClick = () => {
        setShowUnit(true);
    }

    return (
        <div className='flex items-center'>
            <button onClick={() => handleOnClick()}>
                <a className="flex items-center gap-x-2 blue-button max-w-[200px] mt-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Add unit
                </a>
            </button>
        </div>
    )
}

export default UnitActions