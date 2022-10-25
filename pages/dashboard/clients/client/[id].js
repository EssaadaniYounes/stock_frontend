import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Form } from '@/components/parts'
import { Client } from '@/components/ui'
import { fetch } from '@/lib/fetch'
import { useMainStore } from '@/store/MainStore'

function edit({ client, citiesData }) {
    const { setCities } = useMainStore(state => state);
    useEffect(() => {
        setCities(citiesData);
    }, []);
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
    const { data: client } = await fetch(`clients/${id}`, {
        token: ctx.req.cookies.token
    })
    const { data: citiesData } = await fetch('cities', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            client,
            citiesData
        }
    }
}

export default edit