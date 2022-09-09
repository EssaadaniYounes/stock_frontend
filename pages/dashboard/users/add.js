import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import { User } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import { useMainStore } from '../../../store/MainStore'


function add({ rolesData }) {
    const { setRoles } = useMainStore(state => state);
    useEffect(() => {
        setRoles(rolesData)
    }, []);
    return (
        <>

            <CurrentPageHeader icon={icons.AddUser} title="Add user" />

            <Form>
                <User />
            </Form>
        </>
    )
}
export async function getServerSideProps(ctx) {
    const { data: rolesData } = await fetch('roles', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            rolesData
        }
    }
}
export default add