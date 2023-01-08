import React from 'react'
import useTranslation from 'next-translate/useTranslation';
import icons from '@/data/iconsComponents';
import { useSharedVariableStore } from '@/store/sharedVariablesStore'
import { Button } from '@/components/parts';

function PrinterActions() {
    const { setShowPrinter } = useSharedVariableStore();
    const { t } = useTranslation();
    const handleOnClick = () => {
        setShowPrinter(true);
    }

    return (
        <div className='flex items-center'>
            <Button onClickHandler={handleOnClick} icon={<icons.Add />} title={t('common:actions.add')} className='button-add' />
        </div>
    )
}

export default PrinterActions