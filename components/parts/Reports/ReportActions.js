import React from 'react'
import icons from '@/data/iconsComponents'
function ReportActions({ closeState, Print }) {
    return (
        <div className="w-full no-print h-[56px] bg-gray-500 flex items-center justify-between px-4 shadow-md ">
            <button onClick={() => closeState(false)} className="bg-orange-400 p-1.5 px-4 rounded-md shadow-md font-semibold duration-150 hover:bg-orange-600 flex items-center gap-x-1 text-white">
                {<icons.Hide />}
                Hide
            </button>
            <button onClick={() => Print()} className="bg-gray-50 p-1.5 px-4 rounded-md shadow-md font-semibold duration-150 hover:bg-gray-200 flex items-center gap-x-1">
                {<icons.Print />}
                Print
            </button>
        </div>
    )
}

export default ReportActions