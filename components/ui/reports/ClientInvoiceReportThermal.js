import useTranslation from 'next-translate/useTranslation';
import React, { useRef } from 'react'
import { useOnClickOutside } from '@/hooks/click-outside';
import { InvoiceAmountsThermal, InvoiceItemsThermal, InvoiceThermalHeader, InvoiceThermalInfo, ReportActions } from '@/components/parts';
import PrintIframe from '@/utils/print-iframe';

function ClientInvoiceReportThermal({ closeState, id }) {
    const ref = useRef();
    useOnClickOutside(ref, () => closeState(false));
    const { lang } = useTranslation();


    return (
        <>
            <div className="min-h-screen inset-0 fixed top-0 bg-white bg-opacity-40  z-[100] ">
                <div ref={ref} className="w-[85mm] overflow-y-auto h-screen shadow-md shadow-gray-600 ltr:float-right rtl:float-left bg-white flex flex-col">
                    <ReportActions closeState={closeState} Print={PrintIframe} />
                    <iframe src={`/${lang}/iframes/clients_invoices/thermal/${id}`} frameBorder="0" id="iframe" className="h-full"></iframe>
                </div>
            </div>
        </>
    )
}

export default ClientInvoiceReportThermal