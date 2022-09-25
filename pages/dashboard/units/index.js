

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { Unit, SearchCategory, UnitActions, SearchUnit } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import autoLogin, { deleteService } from '../../../services'
import { useMainStore } from '../../../store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '../../../store/authStore'
import { useSharedVariableStore } from '../../../store/sharedVariablesStore'
import { can } from '../../../utils/can'
import { Toast } from '../../../components/parts'
import useTranslation from 'next-translate/useTranslation'
function index({ unitsData, userData }) {
    const { setUser } = useAuthStore(state => state);
    const { t } = useTranslation();
    const permission = JSON.parse(userData.data.permissions).units;

    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && < button onClick={() => deleteUnit(row.id)}>
                    {<icons.Remove />}
                </button>
                }
                {can(permission, 'update') && < button onClick={() => handleOnUpdateClick(row.id)}>
                    <a>{<icons.Update />}</a>
                </button >
                }
            </div >,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: t('common:models.unit'),
            selector: row => row.name,
            sortable: true,

        }];
    const [unit, setUnit] = useState(null);
    const { units, setUnits } = useMainStore(state => state);
    const { showUnit, setShowUnit } = useSharedVariableStore(state => state);

    useEffect(() => {
        if (unitsData && userData) {
            setUnits(unitsData);
            setUser(userData);
        }
    }, []);

    const deleteUnit = async (id) => {
        const res = await deleteService('units', id);
        if (res.success) {
            setUnits(units.filter(unit => unit.id !== id));
            toast.success(res.message, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleOnUpdateClick = (id) => {
        setUnit(units.find(u => u.id == id));
        setShowUnit(true);
    }

    return (
        <>
            <CurrentPageHeader icon={icons.Unit} title={t('common:pages.units')} showBack={false} component={UnitActions} />

            <div className='px-4'>
                <Toast />
                {showUnit && <Unit unit={unit} setState={setUnit} />}
                <SearchUnit allUnits={unitsData} />
                <div className='w-full h-full relative rounded-md overflow-hidden px-4 mt-4'>

                    <CustomDataTable data={units} columns={columns} />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const response = await fetch('units', {
        token: ctx.req.cookies.token
    })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            unitsData: response.data,
            userData: loginResponse.dataUser
        }
    }
}

export default index