import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Form } from '@/components/parts'
import { User } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import { useMainStore } from '@/store/MainStore'


function Add({ rolesData }) {
    const { t } = useTranslation();
    const { setRoles } = useMainStore(state => state);
    useEffect(() => {
        setRoles(rolesData)
    }, []);
    return (
        <>

            <CurrentPageHeader icon={icons.AddUser} title={t('common:actions.add') + ' ' + t('common:models.user')} />

            <Form>
                <User />
            </Form>
        </>
    )
}
export async function getServerSideProps(ctx) {
    const { data } = await fetch('users/items/related_items', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            rolesData: data.roles
        }
    }
}
export default Add