import React from 'react'
import Link from 'next/link'
function AccordionBodyItems({ subItems }) {
    return (
        <>
            {
                subItems.map((subItem, index) => {
                    return (
                        <Link href={subItem.link} key={index}>
                            <a className="bg-red-100 mb-[2px] flex items-center py-2 pl-3 gap-x-2" >
                                {subItem.icon}
                                <div className='font-semibold'>
                                    {subItem.title}
                                </div>
                            </a>
                        </Link>
                    )

                })
            }

        </>)
}

export default AccordionBodyItems