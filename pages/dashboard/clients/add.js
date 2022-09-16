import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import { Client } from '../../../components/ui'
import icons from '../../../data/iconsComponents'

function add() {
    const { t } = useTranslation()
    return (
        <>
            <CurrentPageHeader icon={icons.AddClient} title={t('common:actions.add') +' '+ t('common:models.client')} />

            <Form>
                <div >
                    <Client />

                </div>
            </Form>
        </>
    )
}

export default add