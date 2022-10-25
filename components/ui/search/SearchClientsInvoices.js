import React, { useEffect, useRef, useState } from 'react'
import useSearch from '@/hooks/useSearch';
import { useMainStore } from '@/store/MainStore'
import { SearchHeader } from '@/components/parts';
import useFocus from '@/hooks/useAutoFocus'
import useTranslation from 'next-translate/useTranslation';
import Select from 'react-select';
function SearchClientsInvoices({ allInvoices }) {
    const { t } = useTranslation();
    const { setClientsInvoices, clients } = useMainStore(state => state);
    const [searchItems, setSearchItems] = useState({
        client_name: '',
        invoice_num: '',
        invoice_date: ''
    })

    const [selectedClientId, setSelectedClientId] = useState(0);
    const callBack = (invoice) => {
        return (invoice.client_name.includes(searchItems.client_name != 'All' ? searchItems.client_name : '') &&
            invoice.invoice_num.toLowerCase().includes(searchItems.invoice_num) &&
            invoice.invoice_date.toLowerCase().includes(searchItems.invoice_date))
    }
    useSearch(callBack, setClientsInvoices, searchItems, allInvoices);
    const ref = useRef();
    useFocus(ref)
    const handleOnChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setSearchItems(prev => ({ ...prev, [name]: value.toLowerCase() }));
    }


    return (
        <div className='search-box pb-1' style={{ overflow: 'visible' }}>
            <SearchHeader />
            <div className="search-body">
                <div className="input-container">
                    <label htmlFor="" className='label'>{t('common:models.client')}</label>
                    <Select options={clients}
                        value={clients.find(c => c.id == selectedClientId)}
                        onChange={v => { setSearchItems({ ...searchItems, client_name: v.label }), setSelectedClientId(v.value) }}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="" className='label'>{t('common:info.invoice_num')}</label>
                    <input type="text"
                        name='invoice_num'
                        ref={ref}
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className='input-rounded' />
                </div>
                <div className="input-container">
                    <label htmlFor="" className='label'>{t('common:info.date_invoice')}</label>
                    <input type="date"
                        name="invoice_date"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className='input-rounded' />
                </div>
            </div>
        </div >
    )
}

export default SearchClientsInvoices