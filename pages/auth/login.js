import React from 'react'
import { CurrentPageHeader } from "../../components/layouts";
import useTranslation from 'next-translate/useTranslation'
import { Login } from '../../components/ui';
function login() {
    const { t } = useTranslation()
    const Icon = () => {
        return (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>)
    }

    return (
        <div>
            <CurrentPageHeader icon={Icon} title={t('common:login.title')} />
            <Login />
        </div>
    )
}

export default login