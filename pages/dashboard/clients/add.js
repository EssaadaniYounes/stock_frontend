import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Form } from '@/components/parts'
import { Client } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import { useMainStore } from '@/store/MainStore'

function Add({ cities }) {
    const { setCities } = useMainStore(state => state);
    useEffect(() => {
        setCities(cities);
    }, []);
    const { t } = useTranslation()
    return (
        <>
            <CurrentPageHeader icon={icons.AddClient} title={t('common:actions.add') + ' ' + t('common:models.client')} />

            <Form>
                <div >
                    <Client />

                </div>
            </Form>
        </>
    )
}
export async function getServerSideProps(ctx) {
    const { data } = await fetch('clients/items/related_items', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            cities: data.cities
        }
    }
}
export default Add