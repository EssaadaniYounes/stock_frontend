import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import { Invoice } from '../../../../components/ui'
import { fetch } from '../../../../lib/fetch';
import { useMainStore } from '../../../../store/MainStore';

function edit({ invoice = null, invoiceProducts = null, clients, products, config, payMethodsData }) {
  console.log(invoice)
  const { t } = useTranslation();
  const { setClients, setProducts, setConfig, setPayMethods } = useMainStore(state => state);
  useEffect(() => {
    setClients(clients);
    setProducts(products);
    setConfig(config);
    setPayMethods(payMethodsData);
  }, []);

  return (
    <>
      <CurrentPageHeader title={t('common:actions.update') + ' ' + t('common:models.invoice')} />

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
  const { data: config } = await fetch('config', {
    token: ctx.req.cookies.token
  })
  const { data: payMethodsData } = await fetch('pay_methods', {
    token: ctx.req.cookies.token
  })
  return {
    props: {
      invoice,
      invoiceProducts,
      clients,
      products,
      config,
      payMethodsData
    }
  }
}

export default edit