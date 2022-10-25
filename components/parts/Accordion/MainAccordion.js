import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionBody } from '@material-tailwind/react'
import { TheAccordtionHeader, AccordionBodyItems } from '..'
import icons from '@/data/iconsComponents';
import { useSharedVariableStore } from '@/store/sharedVariablesStore';

function MainAccordion({ items }) {
    const { open, setOpen } = useSharedVariableStore(state => state);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    return (
        <>
            {
                items.map((item, index) => {
                    return (
                        <Accordion open={open == item.id}
                            key={item.id}
                            icon={open == item.id ? <icons.ArrowUp /> : <icons.ArrowDown />}
                            onClick={() => handleOpen(item.id)}>
                            <TheAccordtionHeader item={item} />
                            <AccordionBody open={open == item.id}
                                style={{ margin: 0, padding: 0}}>
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