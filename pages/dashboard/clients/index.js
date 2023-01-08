import React, { useState } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import autoLogin from '@/services'
import { can } from '@/utils/can'
import { ListPage } from '@/components/layouts'
import { DeleteHandler } from '@/components/parts'
import { ClientActions, SearchClient } from '@/components/ui'

function Index({ clientsData, userData }) {
    const permission = JSON.parse(userData.data.permissions).clients;
    const { t } = useTranslation();
    const [selectedClient, setSelectedClient] = useState(null)
    const columns = [
        {
            name: "#",
            cell: row => <div className="flex items-center gap-x-2">
                {can(permission, 'delete') && row.init == 0 && row.init == 0 && <button onClick={() => setSelectedClient(row.id)}>
                    {<icons.Remove />}
                </button>}
                {can(permission, 'update') && < Link href={`/dashboard/clients/client/${row.id}`}>
                    <div className="text-orange-400">
                        <a>{<icons.Update />}</a>
                    </div>
                </Link>}
            </div >,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: t('common:info.full_name'),
            selector: row => row.full_name,
            sortable: true,

        },
        {
            name: t('common:info.street'),
            selector: row => row.street,
            sortable: true,

        },
        {
            name: t('common:info.city'),
            selector: row => row.city,
            sortable: true,

        },
        {
            name: t('common:info.phone'),
            selector: row => row.tel,
            sortable: true,

        },

        {
            name: t('common:info.email'),
            selector: row => row.email,
            sortable: true,

        }

    ];
    return (
        <>
            {selectedClient &&
                <DeleteHandler
                    name="clients"
                    item="clients"
                    setItem="setClients"
                    id={selectedClient}
                    setState={setSelectedClient}
                />}
            <ListPage
                name="clients"
                stateItem="clients"
                setStateItem="setClients"
                serverData={clientsData}
                columns={columns}
                component={ClientActions}
                searchComponent={<SearchClient allClients={clientsData} />}
                showBack={false} icon={icons.Clients} />
        </>
    )
}

export async function getServerSideProps(ctx) {
    const response = await fetch('clients', {
        token: ctx.req.cookies.token
    })

    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            clientsData: response.data,
            userData: loginResponse.dataUser
        }
    }
}

export default Index