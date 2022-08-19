import React from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import { Form } from '../../../../components/parts'
import { Client } from '../../../../components/ui'
import icons from '../../../../data/iconsComponents'
import { fetch } from '../../../../lib/fetch'

function edit({ client }) {
    return (
        <>
            <CurrentPageHeader title="Update client" />

            <Form>
                <Client client={client} />
            </Form>

        </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const response = await fetch(`clients/${id}`, {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            client : response.data
        }
    }
}

export default edit