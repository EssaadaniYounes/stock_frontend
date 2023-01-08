import useTranslation from 'next-translate/useTranslation';
import React from 'react'

function FormHeader({ title, isEdit = false, closeCallBack = false, style }) {
    const { t } = useTranslation();
    return (
        <div className="bg-gray-600 p-2 capitalize text-white font-semibold rounded-t-md flex items-center justify-between " style={style}>
            <div>{!isEdit ? t('common:actions.add') : t('common:actions.update')}
                &nbsp;
                {title}</div>
            {closeCallBack && <div className="mx-2 bg-white px-3 py-1 text-gray-800 rounded-full font-bold cursor-pointer duration-100 hover:bg-gray-100" onClick={() => closeCallBack()} >x</div>}
        </div>
    )
}

export default FormHeader