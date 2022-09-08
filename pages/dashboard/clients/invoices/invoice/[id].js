import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../../components/layouts'
import { Invoice } from '../../../../../components/ui'
import icons from '../../../../../data/iconsComponents';
import { fetch } from '../../../../../lib/fetch';
import { useMainStore } from '../../../../../store/MainStore';

function edit({ invoice = null, invoiceProducts = null, clients, products }) {

  const { setClients, setProducts } = useMainStore(state => state);


  useEffect(() => {
    setClients(clients);
    setProducts(products);
  }, []);

  console.log(invoice, invoiceProducts);
  return (
    <>
      <CurrentPageHeader icon={icons.AddClient} title="Add invoice" />

      <div className="w-full mt-4 px-4 mx-auto">
        <Invoice invoice={invoice} invoiceProducts={invoiceProducts} />

      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const { data: invoice } = await fetch(`clients_invoices/${id}`, {
    token: ctx.req.cookies.token
  });
  const { data: clients } = await fetch(`clients`, {
    token: ctx.req.cookies.token
  });
  const { data: products } = await fetch(`products`, {
    token: ctx.req.cookies.token
  });
  const { data: invoiceProducts } = await fetch(`clients_invoices_items/items/${id}`, {
    token: ctx.req.cookies.token
  });
  return {
    props: {
      invoice,
      invoiceProducts,
      clients,
      products
    }
  }
}

export default edit