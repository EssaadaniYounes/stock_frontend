import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react'
import { VendorInvoice } from '../../../../../components/ui';
import { fetch } from '../../../../../lib/fetch';
import { useMainStore } from '../../../../../store/MainStore';

function edit({ invoice = null, invoiceProducts = null, vendors, products, config, payMethodsData, categories, units }) {
    const { t } = useTranslation();
    const { setVendors, setProducts, setConfig, setPayMethods, setCategories, setUnits } = useMainStore(state => state);
    useEffect(() => {
        setVendors(vendors);
        setProducts(products);
        setConfig(config);
        setPayMethods(payMethodsData);
        setCategories(categories);
        setUnits(units);
    }, []);

    return (
        <>
            <div className="w-full mt-4 px-4 mx-auto">
                <VendorInvoice invoice={invoice} invoiceProducts={invoiceProducts} />
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const { data: invoice } = await fetch(`vendors_invoices/${id}`, {
        token: ctx.req.cookies.token
    });
    const { data: vendors } = await fetch(`vendors`, {
        token: ctx.req.cookies.token
    });
    const { data: products } = await fetch(`products`, {
        token: ctx.req.cookies.token
    });
    const { data: invoiceProducts } = await fetch(`vendors_invoices_items/items/${id}`, {
        token: ctx.req.cookies.token
    });
    const { data: config } = await fetch('config', {
        token: ctx.req.cookies.token
    });
    const { data: payMethodsData } = await fetch('pay_methods', {
        token: ctx.req.cookies.token
    });
    const { data: categories } = await fetch('categories', {
        token: ctx.req.cookies.token
    });
    const { data: units } = await fetch('units', {
        token: ctx.req.cookies.token
    });
    return {
        props: {
            invoice,
            invoiceProducts,
            vendors,
            products,
            config,
            payMethodsData,
            categories,
            units
        }
    }
}

export default edit