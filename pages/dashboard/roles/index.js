import Link from 'next/link'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import CustomDataTable from '@/components/parts/CustomDataTable'
import { RoleActions, SearchRole } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import autoLogin, { deleteService } from '@/services'
import { useMainStore } from '@/store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '@/utils/can'
import { Toast } from '@/components/parts'
import useTranslation from 'next-translate/useTranslation'

function index({ rolesData, userData }) {
  const permission = JSON.parse(userData.data.permissions).roles;
  const { t } = useTranslation();
  const columns = [
    {
      name: "#",
      cell: row => <div className="flex items-center gap-x-2">
        {can(permission, 'delete') && row.init == 0 && <button onClick={() => deleteRole(row.id)}>
          {<icons.Remove />}
        </button>}
        {can(permission, 'update') && < Link href={`/dashboard/roles/role/${row.id}`}>
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
      name: t('common:info.role_name'),
      selector: row => row.role_name,
      sortable: true,
    }];

  const { roles, setRoles } = useMainStore(state => state);

  useEffect(() => {
    setRoles(rolesData);
  }, []);

  const deleteRole = async (id) => {
    const res = await deleteService('roles', id);
    if (res) {
      setRoles(roles.filter(role => role.id !== id));
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
      <CurrentPageHeader icon={icons.Key} title={t('common:pages.roles')} showBack={false} component={RoleActions} />
      <div className='content'>
        <Toast />
        <SearchRole allRoles={rolesData} />
        <div className='w-full h-full rounded-md overflow-hidden px-4 mt-4'>

          <CustomDataTable data={roles} columns={columns} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { data: rolesData } = await fetch('roles', {
    token: ctx.req.cookies.token
  })

  const { dataUser: userData } = await autoLogin(ctx);
  return {
    props: {
      rolesData,
      userData
    }
  }
}

export default index