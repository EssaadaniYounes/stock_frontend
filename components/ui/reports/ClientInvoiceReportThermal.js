import useTranslation from 'next-translate/useTranslation';
import React, { useRef } from 'react'
import { useOnClickOutside } from '@/hooks/click-outside';
import { InvoiceAmountsThermal, InvoiceItemsThermal, InvoiceThermalHeader, InvoiceThermalInfo, ReportActions } from '@/components/parts';

function ClientInvoiceReportThermal({ closeState, data }) {
    const { company, invoice, items } = data;
    console.log(data)
    const ref = useRef();
    useOnClickOutside(ref, () => closeState(false));
    const { t } = useTranslation();
    // return (
    //     <div className="w-full min-h-screen inset-0 fixed top-0 bg-white bg-opacity-40  z-[100] ">
    //         <div ref={ref} className="w-[80mm] overflow-y-auto h-screen shadow-md shadow-gray-600 ltr:float-right rtl:float-left bg-white">
    //             <ReportActions closeState={closeState} />
    //             <div className="px-4 mt-2 flex flex-col gap-y-2 mb-2">
    //                 <InvoiceThermalHeader company={company} />
    //                 <InvoiceThermalInfo invoice={invoice} />
    //                 <InvoiceItemsThermal items={items} />
    //                 <InvoiceAmountsThermal items={items} invoice={invoice} />
    //             </div>
    //         </div>
    //     </div>
    // )
    const printIframe = () => {
        const iframe = document.frames
            ? document.frames[0]
            : document.getElementById("iframe");

        const iframeWindow = iframe.contentWindow || iframe;
        iframe.focus();
        iframeWindow.print();
        return false;
    }

    return (
        <>
            <div className="w-full min-h-screen inset-0 fixed top-0 bg-white bg-opacity-40  z-[100] ">
                <div ref={ref} className="w-[80mm] overflow-y-auto h-screen shadow-md shadow-gray-600 ltr:float-right rtl:float-left bg-white">
                    <ReportActions closeState={closeState} />
                    <iframe src={`iframes/clients_invoices/thermal/${id}`} frameBorder="0" id="iframe"></iframe>
                </div>
            </div>
            <button onClick={() => printIframe()}>Print</button>
        </>
    )
}

export default ClientInvoiceReportThermal