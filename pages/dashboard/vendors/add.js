import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import {Vendor} from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import { useMainStore } from '../../../store/MainStore'

function add({ citiesData }) {
    const { setCities } = useMainStore(state => state);
    useEffect(() => {
        setCities(citiesData);
    }, []);
    return (
        <>
            <CurrentPageHeader icon={icons.AddClient} title="Add Vendor" />

            <Form>
                <Vendor />
            </Form>
        </>
    )
}
export async function getServerSideProps(ctx) {
    const { data: citiesData } = await fetch('cities', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            citiesData
        }
    }
}
export default add