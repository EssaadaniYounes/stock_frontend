import React from 'react'
import { AccordionHeader } from '@material-tailwind/react'
function TheAccordtionHeader({ item }) {
    return (
        <AccordionHeader style={{
            padding: '10px',
            borderBottomColor:'#343d4a'
        }}>
            <div className='flex text-[14px] text-[#f5f5f5] items-center gap-x-2'>
                {item.icon}
                {item.title}
            </div>
        </AccordionHeader>
    )
}

export default TheAccordtionHeader