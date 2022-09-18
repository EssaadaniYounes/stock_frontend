import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { SearchVendor, VendorActions } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import autoLogin, { deleteService } from '../../../services'
import { useMainStore } from '../../../store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '../../../utils/can'
import { Toast } from '../../../components/parts'
import useTranslation from 'next-translate/useTranslation'
function index({ vendorsData, userData }) {
    const permission = JSON.parse(userData.data.permissions).vendors;
    const { t } = useTranslation()
    const columns = [
        {
            name: "#",
            cell: (row, index) => index + 1,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: t('common:general.actions'),
            cell: row => <div className="flex items-center gap-x-2">
                {can(permission, 'delete') && <button onClick={() => deleteVendor(row.id)}>
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

    const { vendors, setVendors } = useMainStore(state => state);

    useEffect(() => {
        if (!vendors.length) {
            setVendors(vendorsData);
        }
    }, []);

    const deleteVendor = async (id) => {
        const res = await deleteService('vendors', id);
        if (res) {
            setVendors(vendors.filter(vendor => vendor.id !== id));
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
    return (
        <>
            <CurrentPageHeader icon={icons.Vendor} title={t('common:pages.vendors')} showBack={false} component={VendorActions} />

            <div className='px-4'>
                <Toast />
                <SearchVendor allVendors={vendorsData} />
                <div className='w-full h-full rounded-md overflow-hidden px-4 mt-4'>
                    <div className='w-full h-14 font-bold text-gray-600 py-3 pl-2 ' >
                        {t('common:general.list')} {t('common:pages.vendors')}
                    </div>
                    <CustomDataTable data={vendors} columns={columns} />
                </div>
            </div>
        </>
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

export default index