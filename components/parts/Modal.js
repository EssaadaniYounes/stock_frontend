import React, { useRef } from 'react'
import { useOnClickOutside } from '../../hooks/click-outside';
import { useSharedVariableStore } from '../../store/sharedVariablesStore';
import { Form } from './'

function Modal(props) {
    const ref = useRef();
    const { setShowProduct } = useSharedVariableStore(state => state);
    useOnClickOutside(ref, () => setShowProduct(false));
    return (
        <div  className='w-full top-0 min-h-screen bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute z-10 '>
            <div ref={ref} className="mx-5">
                <Form>
                    {props.children}
                </Form>
            </div>
        </div>
    )
}

export default Modal