import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthStore } from '../../../store/authStore'
import isShowAccordionItem from '../../../utils/show-accordion-item';
function AccordionBodyItems({ subItems }) {
    const { user } = useAuthStore(state => state);
    const [permissions, setPermissions] = useState(null);
    useEffect(() => {
        setPermissions(JSON.parse(user.data.permissions))
    }, []);
    const router = useRouter();
    return (
        <>
            {
                permissions && subItems.map((subItem, index) => {

                    return (
                        isShowAccordionItem(permissions, subItem.key) && <Link href={subItem.link} key={index}>
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