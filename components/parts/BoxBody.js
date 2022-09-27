import useTranslation from 'next-translate/useTranslation';
import React from 'react'

function BoxBody({ items }) {
    const { t } = useTranslation();
    return (
        <div className="px-2 py-3">
            {Object.keys(items).map(key => {
                return (
                    <div className="flex items-center gap-x-4 mt-1" key={key}>
                        <h1 className="font-semibold text-gray-700">{t(`common:info.${key}`)} :</h1>
                        <p className="flex-1">{items[key]}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default BoxBody