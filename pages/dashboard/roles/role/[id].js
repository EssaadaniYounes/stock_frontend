import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import { Form } from '../../../../components/parts'
import { Product, Role } from '../../../../components/ui'
import icons from '../../../../data/iconsComponents'
import { fetch } from '../../../../lib/fetch'
import { useMainStore } from '../../../../store/MainStore'

function edit({ role }) {
    return (
        <>
            <CurrentPageHeader title="Update role" />

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