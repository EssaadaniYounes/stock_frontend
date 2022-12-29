import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Invoice } from '@/components/ui'
import { fetch } from '@/lib/fetch';
import { useMainStore } from '@/store/MainStore';

function Edit({ invoice = null, invoiceProducts = null, clients, products, config, payMethodsData }) {
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
            <CurrentPageHeader title={t('common:actions.update') + ' ' + t('common:pages.pos')} />

            <div className="w-full mt-4 px-4 mx-auto">
                <Invoice invoice={invoice} invoiceProducts={invoiceProducts} isPos={true} />
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const { data: invoice } = await fetch(`pos/${id}`, {
        token: ctx.req.cookies.token
    });
    const { data } = await fetch('clients_invoices/items/related_items', {
        token: ctx.req.cookies.token
    })
    const { data: invoiceProducts } = await fetch(`clients_invoices_items/items/${id}`, {
        token: ctx.req.cookies.token
    });
    return {
        props: {
            invoice,
            invoiceProducts,
            clients: data.clients,
            products: data.products,
            config: data.config,
            payMethodsData: data.payMethods
        }
    }
}

export default Edit