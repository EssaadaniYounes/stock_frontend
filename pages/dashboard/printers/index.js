import React, { useEffect, useState } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import CustomDataTable from '@/components/parts/CustomDataTable'
import { Printer, PrinterActions, SearchPrinter } from '@/components/ui'
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
function Index({ printersData, userData }) {
    const { user, setUser } = useAuthStore(state => state);
    const { t } = useTranslation();
    const permission = JSON.parse(userData.data.permissions).printers;

    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && row.is_default == 0 && < button onClick={() => deletePrinter(row.id)}>
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
            name: t('common:pages.printers'),
            selector: row => row.name,
            sortable: true,
        },
        {
            name: t('common:info.host'),
            selector: row => row.host,
            sortable: true,
        },
        {
            name: t('common:info.type'),
            selector: row => row.type,
            sortable: true,
        },
    ];
    const [printer, setPrinter] = useState(null);
    const { printers, setPrinters } = useMainStore(state => state);
    const { showPrinter, setShowPrinter } = useSharedVariableStore(state => state);

    useEffect(() => {
        setPrinters(printersData);
        setUser(userData);
    }, []);

    const makeDefault = async (id) => {
        const res = await updateService('printers/default', id, { old_item: printersData.find(p => p.is_default == 1).id });

        if (res.success) {
            const newPrinters = printers.map(p => {
                if (p.id != id) {
                    return { ...p, is_default: 0 }
                }
                return { ...p, is_default: 1 }
            })
            setPrinters(newPrinters);
        }
    }

    const deletePrinter = async (id) => {
        const res = await deleteService('printers', id);
        if (res.success) {
            setPrinters(printers.filter(p => p.id !== id));
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
        setPrinter(printers.find(p => p.id == id));
        setShowPrinter(true);
    }
    return (
        <>
            <CurrentPageHeader icon={icons.Print} title={t('common:pages.printers')} showBack={false} component={PrinterActions} />
            <div className='content'>
                <Toast />
                {showPrinter && <Printer printer={printer} setState={setPrinter} />}
                <SearchPrinter allPrinters={printersData} />
                <div className='w-full h-full relative rounded-md overflow-hidden px-4 mt-4'>
                    <CustomDataTable data={printers} columns={columns} />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { data: printersData } = await fetch('printers', {
        token: ctx.req.cookies.token
    })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            printersData,
            userData: loginResponse.dataUser
        }
    }
}

export default Index