import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader, ListPage } from '@/components/layouts'
import CustomDataTable from '@/components/parts/CustomDataTable'
import { SearchVendor, VendorActions } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import autoLogin, { deleteService } from '@/services'
import { useMainStore } from '@/store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '@/utils/can'
import { DeleteHandler, Toast } from '@/components/parts'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
function Index({ vendorsData, userData }) {
    const permission = JSON.parse(userData.data.permissions).vendors;
    const { t } = useTranslation()
    const [selectedVendor, setSelectedVendor] = useState(null)
    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-x-2">
                {can(permission, 'delete') && row.init == 0 && <button onClick={() => setSelectedVendor(row.id)}>
                    {<icons.Remove />}
                </button>}
                {can(permission, 'update') && < Link href={`/dashboard/vendors/vendor/${row.id}`}>
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
        <div>
            {selectedVendor &&
                <DeleteHandler
                    name="vendors"
                    item="vendors"
                    setItem="setVendors"
                    id={selectedClient}
                    setState={setSelectedClient}
                />}
            <ListPage
                name="vendors"
                stateItem="vendors"
                setStateItem="setVendors"
                serverData={vendorsData}
                columns={columns}
                component={VendorActions}
                searchComponent={<SearchVendor allVendors={vendorsData} />}
                showBack={false} icon={icons.Vendor} />
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const response = await fetch('vendors', {
        token: ctx.req.cookies.token
    })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            vendorsData: response.data,
            userData: loginResponse.dataUser
        }
    }
}

export default Index