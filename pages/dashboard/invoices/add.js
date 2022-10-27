import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Form } from '@/components/parts'
import { Invoice } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import { useMainStore } from '@/store/MainStore'

function add({ clients, products, invoices, config, payMethodsData, InvoiceNum }) {
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
    <>
      <CurrentPageHeader icon={icons.AddClient} title={t('common:actions.add') + ' ' + t('common:models.invoice')} />

      <div className="w-[calc(100%-10px)] my-2 mx-auto">
        <Invoice InvoiceNum={InvoiceNum} />
      </div>
    </>
  )
}
export async function getServerSideProps(ctx) {

  const { data: invoices } = await fetch('clients_invoices', {
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