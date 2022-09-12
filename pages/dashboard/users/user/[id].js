import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import { Form } from '../../../../components/parts'
import { User } from '../../../../components/ui'
import { fetch } from '../../../../lib/fetch'
import { useMainStore } from '../../../../store/MainStore'

function edit({ user, roles }) {
    const { setRoles } = useMainStore(state => state);
    useEffect(() => {
        setRoles(roles);
    }, []);
    return (
        <>
            <CurrentPageHeader title="Update user" />

            <Form>
                <User targetUser={user} />
            </Form>

        </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const { data: user } = await fetch(`users/${id}`, {
        token: ctx.req.cookies.token
    })
    const { data: roles } = await fetch('roles', { token: ctx.req.cookies.token })

    return {
        props: {
            user,
            roles
        }
    }

}


export default edit