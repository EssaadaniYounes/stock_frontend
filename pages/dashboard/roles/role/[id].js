import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import { Form } from '../../../../components/parts'
import { Role } from '../../../../components/ui'
import { fetch } from '../../../../lib/fetch'

function edit({ role }) {
    const { t } = useTranslation();
    return (
        <>
            <CurrentPageHeader title={t('common:actions.add') + ' ' + t('common:models.client')} />

            <Form>
                <Role role={role} />
            </Form>

        </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const { data: role } = await fetch(`roles/${id}`, {
        token: ctx.req.cookies.token
    })


    return {
        props: {
            role
        }
    }

}


export default edit