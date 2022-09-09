

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { Unit, SearchCategory, UnitActions, SearchUnit } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import autoLogin, { deleteService } from '../../../services'
import { useMainStore } from '../../../store/MainStore'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '../../../store/authStore'
import { useSharedVariableStore } from '../../../store/sharedVariablesStore'
import { can } from '../../../utils/can'
function index({ unitsData, userData }) {
    const { setUser } = useAuthStore(state => state);

    const permission = JSON.parse(userData.data.permissions).units;

    const columns = [
        {
            name: "#",
            cell: (row, index) => index + 1,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Actions",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && < button onClick={() => deleteUnit(row.id)}>
                    {<icons.Remove />}
                </button>
                }
                {can(permission, 'update') && < button onClick={() => handleOnUpdateClick(row.id)}>
                    {<icons.Update />}
                </button >
                }
            </div >,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Unit name',
            selector: row => row.name,
            sortable: true,

        },
        {
            name: 'Unit symbol',
            selector: row => row.symbol,
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
            <CurrentPageHeader icon={icons.Unit} title="Units" component={UnitActions} />

            <div className='px-4'>
                <ToastContainer position="top-center"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    transition={Flip}
                    pauseOnHover />
                {showUnit && <Unit unit={unit} />}
                <SearchUnit allUnits={unitsData} />
                <div className='w-full h-full relative rounded-md overflow-hidden px-4 mt-4'>
                    <div className='w-full h-14 font-bold text-gray-600 py-3 pl-2 ' >
                        Units list
                    </div>
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