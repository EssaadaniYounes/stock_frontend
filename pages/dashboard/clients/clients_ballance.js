import React, { useState } from 'react'
import { fetch } from '@/lib/fetch'
import Tabs from '@/components/parts/Tabs'
import { CurrentPageHeader } from '@/components/layouts';
import icons from '@/data/iconsComponents';
import useTranslation from 'next-translate/useTranslation';
function Files({ cities, clientsData }) {
    const { t } = useTranslation();
    const [selectedCityId, setSelectedCityId] = useState(0);
    const [clients, setClients] = useState([]);
    const getClients = (e) => {
        setClients([]);
        const cityId = e.target.value;
        setSelectedCityId(cityId);
        setClients(clientsData.filter(client => client.city_id === cityId));
    }
    return (
        <>
            <CurrentPageHeader icon={icons.Clients} title={t('common:pages.clients_balance')} />

            <div className="">
                <div className='p-3 shadow-md bg-gray-100 flex items-center'>
                    <label className="label mr-2 ">{t('common:actions.filter_by_city')} : </label>
                    <select className="input flex-1 rounded-md" value={selectedCityId} onChange={(e) => { getClients(e) }}>
                        <option value="0">{t('common:actions.select') + ' ' + t('common:models.city')}</option>
                        {cities.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                    </select>
                </div>
                {clients.length > 0 && <Tabs items={clients} />}
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { data: cities } = await fetch('cities', {
        token: ctx.req.cookies.token
    });
    const { data: clientsData } = await fetch('clients', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            cities,
            clientsData
        }
    }
}

export default Files