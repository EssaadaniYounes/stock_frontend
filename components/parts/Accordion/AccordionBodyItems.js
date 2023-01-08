import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store/authStore'
import isShowAccordionItem from '@/utils/show-accordion-item';
import { LinkButton } from '@/components/parts';
import useTranslation from 'next-translate/useTranslation';
function AccordionBodyItems({ subItems }) {
    const { user } = useAuthStore(state => state);
    const [permissions, setPermissions] = useState(null);
    const router = useRouter();
    const { t } = useTranslation()
    useEffect(() => {
        if (user.data) {
            setPermissions(JSON.parse(user.data.permissions))
        }
    }, [user]);
    return (
        <>
            {
                permissions && subItems.map((subItem, index) => {

                    return (
                        isShowAccordionItem(permissions, subItem.key) &&
                        <LinkButton href={subItem.link}

                            key={subItem.key}
                            className={`${router.asPath === subItem.link ? '' : 'bg-[#343d4a]'} text-[#f5f5f5] w-full mb-[1px] flex items-center py-2 pl-3 gap-x-2`}
                            title={t(`common:pages.${subItem.key}`)}
                            icon={subItem.icon}
                        />
                    )

                })
            }

        </>)
}

export default AccordionBodyItems