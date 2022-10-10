import useTranslation from 'next-translate/useTranslation';
import React from 'react'

function FormHeader({ title, isEdit = false }) {
    const { t } = useTranslation();
    return (
        <div className="bg-gray-600 p-2 capitalize text-white font-semibold rounded-t-md">
            {isEdit == null ? t('common:actions.add') : t('common:actions.update')}
            &nbsp;
            {title}
        </div>
    )
}

export default FormHeader