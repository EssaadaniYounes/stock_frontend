import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import icons from '../../data/iconsComponents';
function Empty() {
    const { t } = useTranslation();
    return (
        <div className="w-full h-[300px] flex flex-col items-center justify-center">
            {<icons.Data/>}
            <h1 className="text-4xl font-semibold text-gray-700">{t('common:info.no_data')} ! </h1>
        </div>
    )
}

export default Empty