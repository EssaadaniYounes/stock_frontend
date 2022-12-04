import useTranslation from 'next-translate/useTranslation';
import React, { useRef } from 'react'
import { useOnClickOutside } from '@/hooks/click-outside'
import {  ReportActions } from '@/components/parts'
import PrintIframe from '@/utils/print-iframe';
function ClientInvoiceReport({ closeState, data, id }) {
    const { company, invoice, items } = data;
    const ref = useRef();

    useOnClickOutside(ref, () => closeState(false));
    const { t, lang } = useTranslation();
    return (
        <div className="w-full inset-0 fixed top-0 bg-white bg-opacity-40  z-[100] ">
            <div ref={ref} className="w-[210mm] overflow-y-auto h-screen shadow-md shadow-gray-600 ltr:float-right rtl:float-left bg-white">
                <ReportActions closeState={closeState} Print={PrintIframe} />
                <iframe src={`/${lang}/iframes/clients_invoices/a4/${id}`} frameBorder="0" id="iframe" className="h-full w-full"></iframe>
            </div>
        </div>
    )
}

export default ClientInvoiceReport