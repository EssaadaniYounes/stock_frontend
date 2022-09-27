import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import CustomDataTable from '../../../components/parts/CustomDataTable'
import { RoleActions, SearchRole, SearchUser, UserActions } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import autoLogin, { deleteService } from '../../../services'
import { useMainStore } from '../../../store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '../../../utils/can'
import { Toast } from '../../../components/parts'
import useTranslation from 'next-translate/useTranslation'

function index({ usersData, userData }) {
    const permission = JSON.parse(userData.data.permissions).users;
    const { t } = useTranslation();
    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-x-2">
                {can(permission, 'delete') && row.id != userData.data.id && <button onClick={() => deleteUser(row.id)}>
                    {<icons.Remove />}
                </button>}
                {can(permission, 'update') && < Link href={`/dashboard/users/user/${row.id}`}>
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
            name: t('common:info.name'),
            selector: row => row.name,
            sortable: true,
        },
        {
            name: t('common:info.email'),
            selector: row => row.email,
            sortable: true,
        },
        {
            name: t('common:info.role_name'),
            selector: row => row.role_name,
            sortable: true,
        }
    ];

    const { users, setUsers } = useMainStore(state => state);

    useEffect(() => {
        setUsers(usersData);
    }, []);

    const deleteUser = async (id) => {
        const res = await deleteService('users', id);
        if (res) {
            setUsers(users.filter(user => user.id !== id));
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
        <div>
            <CurrentPageHeader icon={icons.Users} title={t('common:pages.users')} showBack={false} component={UserActions} />
            <div className='content'>
                <Toast />
                <SearchUser allUsers={usersData} />
                <div className='w-full h-full rounded-md overflow-hidden px-4 mt-4'>

                    <CustomDataTable data={users} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    let { data: usersData } = await fetch('users', {
        token: ctx.req.cookies.token
    })
    const { dataUser: userData } = await autoLogin(ctx);
    return {
        props: {
            usersData,
            userData
        }
    }
}

export default index