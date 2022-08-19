import React from 'react'
import { AccordionHeader } from '@material-tailwind/react'
function TheAccordtionHeader({ item }) {
    return (
        <AccordionHeader style={{
            paddingLeft: '10px',
            paddingRight: '10px',
            marginBottom: '-15px',
        }}>
            <div className='flex items-center gap-x-2'>
                {item.icon}
                {item.title}
            </div>
        </AccordionHeader>
    )
}

export default TheAccordtionHeader