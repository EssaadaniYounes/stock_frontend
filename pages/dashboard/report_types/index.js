import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import CustomDataTable from '@/components/parts/CustomDataTable'
import { City, CityActions, PayMethod, PayMethodActions, SearchCity, SearchPayMethod } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import autoLogin, { deleteService, updateService } from '@/services'
import { useMainStore } from '@/store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '@/store/authStore'
import { useSharedVariableStore } from '@/store/sharedVariablesStore'
import { can } from '@/utils/can'
import { Toast } from '@/components/parts'
import useTranslation from 'next-translate/useTranslation'
function Index({ reportTypesData, userData }) {
    const { setUser } = useAuthStore(state => state);
    const { t } = useTranslation();
    const permission = JSON.parse(userData.data.permissions).report_types;

    const columns = [
        {
            name: '#',
            cell: row => row.is_default == 1
                ? can(permission, 'update') && <button disabled className="text-[12px] bg-blue-300 p-2 rounded-md text-white font-semibold mt-1 capitalize cursor-not-allowed" >default</button>
                : <button className="text-[12px] bg-yellow-600 p-2 rounded-md text-white font-semibold mt-1 capitalize duration-150 hover:bg-yellow-500" onClick={() => makeDefault(row.id)}>make default</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '250px'
        },
        {
            name: t('common:info.name'),
            selector: row => row.name,
            sortable: true,
        }
    ];
    const { setReportTypes, reportTypes } = useMainStore(state => state);

    useEffect(() => {
        setReportTypes(reportTypesData);
        setUser(userData);
    }, []);

    const makeDefault = async (id) => {
        const res = await updateService('report_types/default', id, { old_item: reportTypes.find(p => p.is_default == 1).id });

        if (res.success) {
            const newTypes = reportTypes.map(m => {
                if (m.id != id) {
                    return { ...m, is_default: 0 }
                }
                return { ...m, is_default: 1 }
            })
            setReportTypes(newTypes);
        }
    }


    return (
        <>
            <CurrentPageHeader icon={icons.PayMethod} title={t('common:pages.report_types')} showBack={false} />
            <div className='content'>
                <Toast />
                <div className='w-full h-full relative rounded-md overflow-hidden px-4 mt-4'>
                    <CustomDataTable data={reportTypes} columns={columns} />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { data: reportTypesData } = await fetch('report_types', {
        token: ctx.req.cookies.token
    })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            reportTypesData,
            userData: loginResponse.dataUser
        }
    }
}

export default Index