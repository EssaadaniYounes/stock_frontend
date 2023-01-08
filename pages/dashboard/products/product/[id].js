import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Form } from '@/components/parts'
import { Product } from '@/components/ui'
import { fetch } from '@/lib/fetch'
import { useMainStore } from '@/store/MainStore'

function Edit({ product, categories, vendors, units, cities }) {
    const { t } = useTranslation();
    const { setCategories, setVendors, setUnits, setCities } = useMainStore(state => state);
    useEffect(() => {
        setCategories(categories);
        setVendors(vendors);
        setUnits(units);
        setCities(cities);
    }, []);
    return (
        <>
            <CurrentPageHeader title={t('common:actions.update') + ' ' + t('common:models.product')} />

            <Form>
                <Product product={product} />
            </Form>

        </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const { data: product } = await fetch(`products/${id}`, {
        token: ctx.req.cookies.token
    })

    const { data } = await fetch('products/items/related_items', {
        token: ctx.req.cookies.token
    })

    return {
        props: {
            categories: data.categories,
            vendors: data.vendors,
            units: data.units,
            cities: data.cities,
            product
        }
    }

}


export default Edit