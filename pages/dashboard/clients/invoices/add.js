import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import { Form } from '../../../../components/parts'
import { Invoice } from '../../../../components/ui'
import icons from '../../../../data/iconsComponents'
import { fetch } from '../../../../lib/fetch'
import { useMainStore } from '../../../../store/MainStore'

function add({ clients, products, invoices, config }) {
  const { setClients, setProducts, setClientsInvoices, setConfig } = useMainStore(state => state);

  useEffect(() => {
    setClients(clients);
    setProducts(products);
    setClientsInvoices(invoices)
    setConfig(config);
  }, []);

  return (
    <>
      <CurrentPageHeader icon={icons.AddClient} title="Add invoice" />

      <div className="w-full mt-4 px-4 mx-auto">
        <Invoice />

      </div>
    </>
  )
}
export async function getServerSideProps(ctx) {
  const { data: clients } = await fetch('clients', {
    token: ctx.req.cookies.token
  });
  const { data: products } = await fetch('products', {
    token: ctx.req.cookies.token
  });
  const { data: invoices } = await fetch('clients_invoices', {
    token: ctx.req.cookies.token
  })
  const { data: config } = await fetch('config', {
    token: ctx.req.cookies.token
  })


  return {
    props: {
      clients,
      products,
      invoices,
      config
    }
  }

}

export default add