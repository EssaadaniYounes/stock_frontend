import React, { useEffect, useRef, useState } from 'react'
import useSearch from '@/hooks/useSearch';
import { useMainStore } from '@/store/MainStore'
import { SearchHeader } from '@/components/parts';
import useFocus from '@/hooks/useAutoFocus'
import useTranslation from 'next-translate/useTranslation';
import Select from 'react-select';
function SearchVendorsInvoices({ allInvoices }) {
    const { t } = useTranslation();
    const { setVendorsInvoices, vendors } = useMainStore(state => state);
    const [searchItems, setSearchItems] = useState({
        vendor_name: '',
        invoice_num: '',
        invoice_date: ''
    })

    const [selectedVendorId, setSelectedVendorId] = useState(0);
    const callBack = (invoice) => {
        return (invoice.vendor_name?.includes(searchItems.vendor_name != 'All' ? searchItems.vendor_name : '') &&
            invoice.invoice_num?.toLowerCase().includes(searchItems.invoice_num) &&
            invoice.invoice_date?.toLowerCase().includes(searchItems.invoice_date))
    }
    useSearch(callBack, setVendorsInvoices, searchItems, allInvoices);
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
                    <label htmlFor="" className='label'>{t('common:models.vendor')}</label>
                    <Select options={vendors}
                        value={vendors.find(v => v.id == selectedVendorId)}
                        onChange={v => { setSearchItems({ ...searchItems, vendor_name: v.label }), setSelectedVendorId(v.value) }}
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
                <div className="input-container z-[500]">
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

export default SearchVendorsInvoices