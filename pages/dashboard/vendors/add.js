import React from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import {Vendor} from '../../../components/ui'
import icons from '../../../data/iconsComponents'

function add() {
    return (
        <>
            <CurrentPageHeader icon={icons.AddClient} title="Add Vendor" />

            <Form>
                <Vendor />
            </Form>
        </>
    )
}

export default add