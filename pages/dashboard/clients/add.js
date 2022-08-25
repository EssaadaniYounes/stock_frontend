import React from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import { Client } from '../../../components/ui'
import icons from '../../../data/iconsComponents'

function add() {
    return (
        <>
            <CurrentPageHeader icon={icons.AddClient} title="Add client" />

            <Form>
                <div >
                    <Client />

                </div>
            </Form>
        </>
    )
}

export default add