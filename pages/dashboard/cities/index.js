import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { Category, CategoryActions, City, CityActions, SearchCategory, SearchCity } from '../../../components/ui'
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
function index({ citiesData, userData }) {
    const { user, setUser } = useAuthStore(state => state);
    const { t } = useTranslation();
    const permission = JSON.parse(userData.data.permissions).cities;

    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && < button onClick={() => deleteCity(row.id)}>
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
            name: t('common:pages.cities'),
            selector: row => row.name,
            sortable: true,

        }
    ];
    const [city, setCity] = useState(null);
    const { cities, setCities } = useMainStore(state => state);
    const { showCity, setShowCity } = useSharedVariableStore(state => state);

    useEffect(() => {
        setCities(citiesData);
        setUser(userData);
    }, []);

    const deleteCity = async (id) => {
        const res = await deleteService('cities', id, 'city');
        if (res.success) {
            setCities(cities.filter(c => c.id !== id));
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
        setCity(cities.find(c => c.id == id));
        setShowCity(true);
    }

    return (
        <>
            <CurrentPageHeader icon={icons.City} title={ t('common:pages.cities') } showBack={false} component={CityActions} />
            <div className='content'>
                <Toast />
                {showCity && <City city={city} setState={setCity} />}
                <SearchCity allCities={citiesData} />
                <div className='w-full h-full relative rounded-md overflow-hidden px-4 mt-4'>
                    <CustomDataTable data={cities} columns={columns} />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { data: citiesData } = await fetch('cities', {
        token: ctx.req.cookies.token
    })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            citiesData,
            userData: loginResponse.dataUser
        }
    }
}

export default index