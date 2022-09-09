import React from 'react'
import icons from '../../../data/iconsComponents';
import { useSharedVariableStore } from '../../../store/sharedVariablesStore'
import { Button } from '../../parts';

function UnitActions() {
    const { setShowUnit } = useSharedVariableStore();
    const handleOnClick = () => {
        setShowUnit(true);
    }

    return (
        <div className='flex items-center'>
            <Button onClickHandler={handleOnClick} icon={<icons.Add />} title="Add" className="button-add " />
        </div>
    )
}

export default UnitActions