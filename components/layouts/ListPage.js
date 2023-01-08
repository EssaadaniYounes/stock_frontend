import React, { useEffect } from 'react'
import { deleteService } from '@/services';
import { useMainStore } from '@/store/MainStore';
import { toast } from 'react-toastify';
import { Toast } from '../parts';
import CustomDataTable from '../parts/CustomDataTable';
import CurrentPageHeader from './CurrentPageHeader';
import useTranslation from 'next-translate/useTranslation';

function ListPage({
    name,
    stateItem, setStateItem, serverData, columns,
    component, searchComponent,
    showBack, icon }) {
    const { t } = useTranslation();

    const items = useMainStore(state => state[stateItem]);
    const setItems = useMainStore(state => state[setStateItem]);

    useEffect(() => {
        if (!items.length) {
            setItems(serverData);
        }
    }, []);
    return (
        <div>
            <CurrentPageHeader icon={icon} title={t(`common:pages.${name}`)} showBack={showBack} component={component} />
            <div className='content'>
                <Toast />
                {searchComponent}
                <div className='w-full h-full rounded-md overflow-hidden px-4 mt-4'>
                    <CustomDataTable data={items} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export default ListPage