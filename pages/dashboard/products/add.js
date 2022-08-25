import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import { Product } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import { useMainStore } from '../../../store/MainStore'

function add({ categories, vendors }) {

    const { setCategories, setVendors } = useMainStore(state => state);
    useEffect(() => {
        setCategories(categories);
        setVendors(vendors);
    }, []);

    return (
        <div className=''>
            <CurrentPageHeader icon={icons.AddItem} title="Add product" />
            
            <Form>
                <Product />
            </Form>
        </div>
    )
}


export async function getServerSideProps(ctx) {
    const categoriesRes = await fetch('categories', {
        token: ctx.req.cookies.token
    });
    const vendorsRes = await fetch('vendors', {
        token: ctx.req.cookies.token
    });

    return {
        props: {
            categories: categoriesRes.data,
            vendors: vendorsRes.data
        }
    }

}

export default add