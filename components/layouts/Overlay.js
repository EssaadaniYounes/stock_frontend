import React from 'react'
import { useSharedVariableStore } from '../../store/sharedVariablesStore';

function Overlay() {
    const { setShowSideBar } = useSharedVariableStore();
    return (
        <div onClick={() => setShowSideBar(false)} className="w-full h-full block md:hidden fixed inset-0 z-[38] bg-black bg-opacity-50">

        </div>
    )
}

export default Overlay