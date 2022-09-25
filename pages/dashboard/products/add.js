import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import { Product } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import { useMainStore } from '../../../store/MainStore'

function add({ categories, vendors, units }) {
    const { t } = useTranslation();
    const { setCategories, setVendors, setUnits } = useMainStore(state => state);
    useEffect(() => {
        setCategories(categories);
        setVendors(vendors);
        setUnits(units);
    }, []);

    return (
        <div className=''>
            <CurrentPageHeader icon={icons.AddItem} title={t('common:actions.add') + ' ' + t('common:models.product')} />

            <Form>
                <Product items={{ vendors, categories, units }} />
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
    const unitsRes = await fetch('units', {
        token: ctx.req.cookies.token
    });

    return {
        props: {
            categories: categoriesRes.data,
            vendors: vendorsRes.data,
            units: unitsRes.data
        }
    }

}

export default add