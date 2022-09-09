import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
function AccordionBodyItems({ subItems }) {
    const router = useRouter();
    return (
        <>
            {
                subItems.map((subItem, index) => {
                    return (
                        <Link href={subItem.link} key={index}>
                            <a className={`${router.asPath === subItem.link ? '' : 'bg-[#343d4a]'} text-[#f5f5f5] mb-[1px] flex items-center py-2 pl-3 gap-x-2`} >
                                {subItem.icon}
                                <div className='font-semibold text-[14px]'>
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