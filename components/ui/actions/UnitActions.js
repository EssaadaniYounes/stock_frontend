import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import icons from '@/data/iconsComponents';
import { useSharedVariableStore } from '@/store/sharedVariablesStore'
import { Button } from '@/components/parts';

function UnitActions() {
    const { setShowUnit } = useSharedVariableStore();
    const { t } = useTranslation();
    const handleOnClick = () => {
        setShowUnit(true);
    }

    return (
        <div className='flex items-center'>
            <Button onClickHandler={handleOnClick} icon={<icons.Add />} title={t('common:actions.add')} className="button-add " />
        </div>
    )
}

export default UnitActions