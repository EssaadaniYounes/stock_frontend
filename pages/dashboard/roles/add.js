import React from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import { Role } from '../../../components/ui'
import icons from '../../../data/iconsComponents'


function add() {

    return (
        <>

            <CurrentPageHeader icon={icons.Settings} title="Add role" />

            <Form>
                <Role />
            </Form>
        </>
    )
}

export default add