import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../../components/layouts'
import { Form } from '../../../../components/parts'
import { Product } from '../../../../components/ui'
import icons from '../../../../data/iconsComponents'
import { fetch } from '../../../../lib/fetch'
import { useMainStore } from '../../../../store/MainStore'

function edit({ product, categories, vendors }) {
    const { setCategories, setVendors } = useMainStore(state => state);
    useEffect(() => {
        setCategories(categories);
        setVendors(vendors);
    }, []);
    return (
        <>
            <CurrentPageHeader title="Update product" />

            <Form>
                <Product product={product} />
            </Form>

        </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const productResponse = await fetch(`products/${id}`, {
        token: ctx.req.cookies.token
    })

    const categoriesRes = await fetch('categories', {
        token: ctx.req.cookies.token
    });
    const vendorsRes = await fetch('vendors', {
        token: ctx.req.cookies.token
    });

    return {
        props: {
            categories: categoriesRes.data,
            vendors: vendorsRes.data,
            product: productResponse.data
        }
    }

}


export default edit