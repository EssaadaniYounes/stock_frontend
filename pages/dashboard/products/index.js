import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import CustomDataTable from '@/components/parts/CustomDataTable'
import { ProductActions, SearchProduct } from '@/components/ui'
import icons from '@/data/iconsComponents'
import { fetch } from '@/lib/fetch'
import autoLogin, { deleteService } from '@/services'
import { useMainStore } from '@/store/MainStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { can } from '@/utils/can';
import { Toast } from '@/components/parts'
import calStockQty from '@/utils/calc-qty-stock'
import useTranslation from 'next-translate/useTranslation'
import currency from '@/utils/format-money'
function index({ productsData, userData }) {

    const permission = JSON.parse(userData.data.permissions).products;
    const { t } = useTranslation();
    const columns = [

        {
            name: "#",
            cell: row => <div className="flex items-center gap-2">
                {can(permission, 'delete') && < button onClick={() => deleteProduct(row.id)}>
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
    const { products, setProducts } = useMainStore(state => state);

    useEffect(() => {
        setProducts(productsData)
    }, []);

    const deleteProduct = async (id) => {
        const res = await deleteService('products', id);
        if (res.success) {
            setProducts(products.filter(p => p.id !== id));
            toast.success(res.message, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };



    return (
        <>
            <CurrentPageHeader icon={icons.Product} title={t('common:pages.products')} showBack={false} component={ProductActions} />

            <div className='relative px-4'>
                <Toast />
                <SearchProduct allProducts={productsData} />
                <div className='w-full h-full relative rounded-md overflow-hidden mt-4'>

                    <CustomDataTable data={products} columns={columns} />
                </div>
            </div>
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

export default index