import Link from 'next/link';
import React, { useState } from 'react';
import { ListPage } from '@/components/layouts';
import { ProductActions, SearchProduct } from '@/components/ui';
import icons from '@/data/iconsComponents';
import { fetch } from '@/lib/fetch';
import autoLogin from '@/services';
import { can } from '@/utils/can';
import { DeleteHandler } from '@/components/parts';
import calStockQty from '@/utils/calc-qty-stock';
import useTranslation from 'next-translate/useTranslation';
import currency from '@/utils/format-money';
function Index({ productsData, userData }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const permission = JSON.parse(userData.data.permissions).products;
    const { t } = useTranslation();
    const columns = [
        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && < button onClick={() => setSelectedProduct(row.id)}>
                    {<icons.Remove />}
                </button>}
                {can(permission, 'update') && < Link href={`/dashboard/products/product/${row.id}`}>
                    <a>{<icons.Update />}</a>
                </Link>}
            </div >,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: t('common:info.barcode'),
            selector: row => row.barcode,
            sortable: true,
        },
        {
            name: t('common:models.product'),
            selector: row => row.name,
            sortable: true,
        },
        {
            name: t('common:models.category'),
            selector: row => row.category_name,
            sortable: true,
        },
        {
            name: t('common:models.unit'),
            selector: row => row.unit_name,
            sortable: true,
        },
        {
            name: t('common:info.qty_stock'),
            //suppliers_invoices_qty + clients_returns_qty - clients_invoices_qty - suppliers_returns_qty
            selector: row => calStockQty(row.quantity_initial,
                row.clients_invoices_qty,
                row.suppliers_invoices_qty,
                row.clients_returns_qty,
                row.suppliers_returns_qty),
            sortable: true,
        },
        {
            name: t('common:info.sell_price'),
            selector: row => currency(row.sell_price),
            sortable: true,
        },
        {
            name: t('common:info.buy_price'),
            selector: row => currency(row.buy_price),
            sortable: true,
        },
        {
            name: t('common:models.vendor'),
            selector: row => row.vendor_name,
            sortable: true,
        },
    ];

    return (
        <>
            {selectedProduct &&
                <DeleteHandler
                    name="products"
                    item="products"
                    setItem="setProducts"
                    id={selectedProduct}
                    setState={setSelectedProduct}
                />}
            <ListPage
                name="products"
                stateItem="products"
                setStateItem="setProducts"
                serverData={productsData}
                columns={columns}
                component={ProductActions}
                searchComponent={<SearchProduct allProducts={productsData} />}
                showBack={false} icon={icons.Product} />
        </>
    )
}

export async function getServerSideProps(ctx) {
    const response = await fetch('products', {
        token: ctx.req.cookies.token
    })
    const loginResponse = await autoLogin(ctx);
    return {
        props: {
            productsData: response.data,
            userData: loginResponse.dataUser
        }
    }
}

export default Index