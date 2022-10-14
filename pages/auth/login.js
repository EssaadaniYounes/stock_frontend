import React, { useEffect } from 'react'
import { CurrentPageHeader } from "../../components/layouts";
import useTranslation from 'next-translate/useTranslation'
import { Login } from '../../components/ui';
import { useAuthStore } from '../../store/authStore';
function login() {

    const { setUser } = useAuthStore(state => state);;

    useEffect(() => {
        setUser(null)
    }, []);


    return (
        <div>
            <Login />
        </div>
    )
}

export default login