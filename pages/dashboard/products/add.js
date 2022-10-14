import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import Select from 'react-select'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import { Product } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'
import { useMainStore } from '../../../store/MainStore'

function add({ categories, vendors, units, cities }) {
    const { t } = useTranslation();
    const { setCategories, setVendors, setUnits, setCities } = useMainStore(state => state);
    useEffect(() => {
        setCategories(categories);
        setVendors(vendors);
        setUnits(units);
        setCities(cities);
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

    const { data } = await fetch('products/items/related_items', {
        token: ctx.req.cookies.token
    })
    return {
        props: {
            categories: data.categories,
            vendors: data.vendors,
            units: data.units,
            cities: data.cities
        }
    }

}

export default add