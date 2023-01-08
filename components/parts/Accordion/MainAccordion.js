import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionBody } from '@material-tailwind/react'
import { TheAccordtionHeader, AccordionBodyItems } from '..'
import icons from '@/data/iconsComponents';
import { useSharedVariableStore } from '@/store/sharedVariablesStore';
import { useAuthStore } from '@/store/authStore';
import isShowAccordionHeader from '@/utils/is-show-accordion-header';

function MainAccordion({ items }) {
    const { open, setOpen } = useSharedVariableStore(state => state);
    const { user } = useAuthStore(state => state);
    const [permissions, setPermissions] = useState(null);
    // console.log(user.data && JSON.parse(user.data.permissions));
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    useEffect(() => {
        if (user.data) {
            setPermissions(JSON.parse(user.data.permissions))
        }
    }, [user]);
    return (
        <>
            {
                permissions && items.map((item, index) => {
                    return (
                        isShowAccordionHeader(item, permissions) &&
                        <Accordion open={open == item.id}
                            key={item.id}
                            icon={open == item.id ? <icons.ArrowUp /> : <icons.ArrowDown />}
                            onClick={() => handleOpen(item.id)}>
                            <TheAccordtionHeader item={item} />
                            <AccordionBody open={open == item.id}
                                style={{ margin: 0, padding: 0 }}>
                                <AccordionBodyItems subItems={item.subItems} />
                            </AccordionBody>
                        </Accordion>
                    )
                })
            }
        </>
    )
}

export default MainAccordion