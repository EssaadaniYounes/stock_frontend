import { FormHeader } from '@/components/parts'
import { Invoice } from '@/components/ui'
import { fetch } from '@/lib/fetch'
import { useMainStore } from '@/store/MainStore';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react'

function add({ InvoiceNum, clients, products, invoices, config, payMethodsData }) {
  const { setClients, setProducts, setClientsInvoices, setConfig, setPayMethods } = useMainStore(state => state);
  const { t } = useTranslation();
  useEffect(() => {
    setClients(clients);
    setProducts(products);
    setClientsInvoices(invoices);
    setConfig(config);
    setPayMethods(payMethodsData);
  }, []);
  return (
    <div className='px-2 mt-1'>
      <Invoice isPos={true} InvoiceNum={InvoiceNum} />
    </div>
  )
}
export async function getServerSideProps(ctx) {

  const { data: invoices } = await fetch('pos', {
    token: ctx.req.cookies.token
  })
  const { data } = await fetch('clients_invoices/items/related_items', {
    token: ctx.req.cookies.token
  })
  const InvoiceNum = invoices.length > 0 ? +invoices[invoices.length - 1].invoice_num + 1 : 1;
  return {
    props: {
      InvoiceNum,
      clients: data.clients,
      products: data.products,
      invoices,
      config: data.config,
      payMethodsData: data.payMethods
    }
  }

}
export default add