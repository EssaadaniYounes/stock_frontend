import React from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import { Form } from '../../../../components/parts'
import { Vendor } from '../../../../components/ui'
import { fetch } from '../../../../lib/fetch'

function edit({ vendor }) {
    return (
        <>
            <CurrentPageHeader title="Update client" />

            <Form>
                <Vendor vendor={vendor} />
            </Form>

        </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const response = await fetch(`vendors/${id}`, {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            vendor : response.data
        }
    }
}

export default edit