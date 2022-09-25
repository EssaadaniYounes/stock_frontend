import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import { Form } from '../../../../components/parts'
import { Vendor } from '../../../../components/ui'
import { fetch } from '../../../../lib/fetch'
import { useMainStore } from '../../../../store/MainStore'

function edit({ vendor, citiesData }) {
    const { setCities } = useMainStore(state => state);
    useEffect(() => {
        setCities(citiesData);
    }, []);
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
    const { data: vendor } = await fetch(`vendors/${id}`, {
        token: ctx.req.cookies.token
    })
    const { data: citiesData } = await fetch('cities', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            vendor,
            citiesData
        }
    }
}

export default edit