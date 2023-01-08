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
function Index({ payMethodsData, userData }) {
    const { setUser } = useAuthStore(state => state);
    const { t } = useTranslation();
    const permission = JSON.parse(userData.data.permissions).pay_methods;

    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && row.id != 1 && row.is_default == 0 && < button onClick={() => deletePayMethod(row.id)}>
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
            cell: row => row.is_default == 1
                ? can(permission, 'update') && <button disabled className="text-[12px] bg-blue-300 p-2 rounded-md text-white font-semibold mt-1 capitalize cursor-not-allowed" >default</button>
                : <button className="text-[12px] bg-yellow-600 p-2 rounded-md text-white font-semibold mt-1 capitalize duration-150 hover:bg-yellow-500" onClick={() => makeDefault(row.id)}>make default</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: t('common:info.name'),
            selector: row => row.name,
            sortable: true,
        }
    ];
    const [payMethod, setPayMethod] = useState(null);
    const { payMethods, setPayMethods } = useMainStore(state => state);
    const { showPayMethod, setShowPayMethod } = useSharedVariableStore(state => state);

    useEffect(() => {
        setPayMethods(payMethodsData);
        setUser(userData);
    }, []);

    const makeDefault = async (id) => {
        const res = await updateService('pay_methods/default', id, { old_item: payMethodsData.find(p => p.is_default == 1).id });

        if (res.success) {
            const newMethods = payMethods.map(m => {
                if (m.id != id) {
                    return { ...m, is_default: 0 }
                }
                return { ...m, is_default: 1 }
            })
            setPayMethods(newMethods);
        }
    }

    const deletePayMethod = async (id) => {
        const res = await deleteService('pay_methods', id, 'Method');
        if (res.success) {
            setPayMethods(payMethods.filter(c => c.id !== id));
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
        setPayMethod(payMethods.find(c => c.id == id));
        setShowPayMethod(true);
    }

    return (
        <>
            <CurrentPageHeader icon={icons.PayMethod} title={t('common:pages.pay_methods')} showBack={false} component={PayMethodActions} />
            <div className='content'>
                <Toast />
                {showPayMethod && <PayMethod payMethod={payMethod} setState={setPayMethod} />}
                <SearchPayMethod allPayMethods={payMethodsData} />
                <div className='w-full h-full relative rounded-md overflow-hidden px-4 mt-4'>
                    <CustomDataTable data={payMethods} columns={columns} />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { data: payMethodsData } = await fetch('pay_methods', {
        token: ctx.req.cookies.token
    })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            payMethodsData,
            userData: loginResponse.dataUser
        }
    }
}

export default Index