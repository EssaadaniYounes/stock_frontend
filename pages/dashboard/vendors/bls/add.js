import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Invoice, VendorInvoice } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import { useMainStore } from '@/store/MainStore'

function add({ vendors, products, invoices, config, payMethodsData, categories, units }) {
  const { setVendors, setProducts, setVendorsInvoices, setConfig, setPayMethods, setCategories, setUnits } = useMainStore(state => state);
  const { t } = useTranslation();
  useEffect(() => {
    setVendors(vendors);
    setProducts(products);
    setVendorsInvoices(invoices);
    setConfig(config);
    setPayMethods(payMethodsData);
    setCategories(categories);
    setUnits(units);
  }, []);

  return (
    <>
      <div className="w-full mt-4 px-4 mx-auto">
        <VendorInvoice />
      </div>
    </>
  )
}
export async function getServerSideProps(ctx) {
  const { data: invoices } = await fetch('vendors_invoices', {
    token: ctx.req.cookies.token
  })
  
  const { data } = await fetch('vendors_invoices/items/related_items', {
    token: ctx.req.cookies.token
  })
  return {
    props: {
      vendors:data.vendors,
      products:data.products,
      invoices,
      config:data.config,
      payMethodsData:data.payMethods,
      categories:data.categories,
      units:data.units
    }
  }

}

export default add