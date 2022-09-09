import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { Category, CategoryActions, SearchCategory } from '../../../components/ui'
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
function index({ categoriesData, userData }) {
    const { user, setUser } = useAuthStore(state => state);

    const permission = JSON.parse(userData.data.permissions).categories;

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
                {can(permission, 'delete') && < button onClick={() => deleteCategory(row.id)}>
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
            name: 'Category name',
            selector: row => row.name,
            sortable: true,

        }
    ];
    const [category, setCategory] = useState(null);
    const { categories, setCategories } = useMainStore(state => state);
    const { showCategory, setShowCategory } = useSharedVariableStore(state => state);

    useEffect(() => {
        if (categoriesData && userData) {
            setCategories(categoriesData);
            setUser(userData);
        }
    }, []);

    const deleteCategory = async (id) => {
        const res = await deleteService('categories', id, 'category');
        if (res.success) {
            setCategories(categories.filter(category => category.id !== id));
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
        setCategory(categories.find(c => c.id == id));
        setShowCategory(true);
    }

    return (
        <div className=''>
            <Toast />
            <CurrentPageHeader icon={icons.Categories} title="Categories" component={CategoryActions} />
            {showCategory && <Category category={category} />}
            <SearchCategory allCategories={categoriesData} />
            <div className='w-full h-full relative rounded-md overflow-hidden px-4 mt-4'>
                <div className='w-full h-14 font-bold text-gray-600 py-3 pl-2 ' >
                    Categories list
                </div>
                <CustomDataTable data={categories} columns={columns} />
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const response = await fetch('categories', {
        token: ctx.req.cookies.token
    })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            categoriesData: response.data,
            userData: loginResponse.dataUser
        }
    }
}

export default index