import React, { useState } from 'react';
import Link from 'next/link';
import { ListPage } from '@/components/layouts';
import { RoleActions, SearchRole } from '@/components/ui';
import icons from '@/data/iconsComponents';
import { fetch } from '@/lib/fetch';
import autoLogin from '@/services';
import { can } from '@/utils/can';
import { DeleteHandler } from '@/components/parts';
import useTranslation from 'next-translate/useTranslation';

function Index({ rolesData, userData }) {
  const permission = JSON.parse(userData.data.permissions).roles;
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState(null);
  const columns = [
    {
      name: "#",
      cell: row => <div className="flex items-center gap-x-2">
        {can(permission, 'delete') && row.init == 0 && <button onClick={() => setSelectedRole(row.id)}>
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
  return (
    <>
      {selectedRole &&
        <DeleteHandler
          name="roles"
          item="roles"
          setItem="setRoles"
          id={selectedRole}
          setState={setSelectedRole}
        />}
      <ListPage
        name="roles"
        stateItem="roles"
        setStateItem="setRoles"
        serverData={rolesData}
        columns={columns}
        component={RoleActions}
        searchComponent={<SearchRole allRoles={rolesData} />}
        showBack={false} icon={icons.Key} />
    </>
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

export default Index