import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Form } from '@/components/parts'
import { Vendor } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import { useMainStore } from '@/store/MainStore'

function add({ citiesData }) {
    const { setCities } = useMainStore(state => state);
    const { t } = useTranslation();
    useEffect(() => {
        setCities(citiesData);
    }, []);
    return (
        <>
            <CurrentPageHeader icon={icons.AddClient} title={t('common:actions.add') + ' ' + t('common:models.vendor')} />

            <Form>
                <Vendor />
            </Form>
        </>
    )
}
export async function getServerSideProps(ctx) {
    const { data } = await fetch('vendors/items/related_items', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            citiesData: data.cities
        }
    }
}
export default add