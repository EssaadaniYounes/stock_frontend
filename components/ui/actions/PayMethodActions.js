import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import icons from '@/data/iconsComponents';
import { useSharedVariableStore } from '@/store/sharedVariablesStore'
import { Button } from '@/components/parts';

function PayMethodActions() {
    const { setShowPayMethod } = useSharedVariableStore();
    const { t } = useTranslation();
    const handleOnClick = () => {
        setShowPayMethod(true);
    }

    return (
        <div className='flex items-center'>
            <Button onClickHandler={handleOnClick} icon={<icons.Add />} title={t('common:actions.add')} className='button-add' />
        </div>
    )
}

export default PayMethodActions