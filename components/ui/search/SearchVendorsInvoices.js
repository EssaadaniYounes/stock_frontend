import React, { useEffect, useRef, useState } from 'react'
import useSearch from '../../../hooks/useSearch';
import { useMainStore } from '../../../store/MainStore'
import { SearchHeader } from '../../parts';
import useFocus from '../../../hooks/useAutoFocus'
import useTranslation from 'next-translate/useTranslation';

function SearchVendorsInvoices({ allInvoices }) {
    const { t } = useTranslation();
    const { setVendorsInvoices, vendors } = useMainStore(state => state);
    const [searchItems, setSearchItems] = useState({
        vendor_name: '',
        invoice_num: '',
        invoice_date: ''
    })

    const callBack = (invoice) => {
        return (invoice.vendor_name.toLowerCase().includes(searchItems.vendor_name) &&
            invoice.invoice_num.toLowerCase().includes(searchItems.invoice_num) &&
            invoice.invoice_date.toLowerCase().includes(searchItems.invoice_date))
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
        <div className='search-box'>
            <SearchHeader />
            <div className='search-body'>

                <div className="relative z-0 mb-6 flex-1 group">
                    <label htmlFor="" className='label'>{t('common:models.vendor')}</label>
                    <select type="text"
                        name="vendor_name"
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className='input-rounded' >
                        <option value={''} >All suplliers</option>
                        {vendors.map((vendor, i) => <option key={vendor.id} value={vendor.full_name}>{vendor.full_name}</option>)}
                    </select>
                </div>
                <div className="relative z-0 mb-6 flex-1 group">
                    <label htmlFor="" className='label'>{t('common:info.invoice_num')}</label>
                    <input type="text"
                        name='invoice_num'
                        ref={ref}
                        onChange={e => handleOnChange(e)}
                        placeholder=' '
                        className='input-rounded' />
                </div>
                <div className="relative z-0 mb-6 flex-1 group">
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