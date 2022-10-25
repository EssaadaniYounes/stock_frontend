import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Form } from '@/components/parts'
import { Role } from '@/components/ui'
import icons from '@/data/iconsComponents'


function add() {
    const { t } = useTranslation();
    return (
        <>

            <CurrentPageHeader icon={icons.Settings} title={t('common:actions.add') + ' ' + t('common:models.role')} />

            <Form>
                <Role />
            </Form>
        </>
    )
}

export default add