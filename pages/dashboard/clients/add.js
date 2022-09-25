import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import { Client } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import { useMainStore } from '../../../store/MainStore'

function add({ citiesData }) {
    const { setCities } = useMainStore(state => state);
    useEffect(() => {
        setCities(citiesData);
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