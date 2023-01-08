import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import icons from '@/data/iconsComponents'
import { Button, LinkButton } from '@/components/parts'

function ImportProductActions({ link }) {
    const { t } = useTranslation();
    return (
        <div className='flex items-center justify-end'>

            <Button title={t('common:actions.download_examples')}
                className='purple-button'
                icon={<icons.Plus />}
                style={{ fontSize: '12px', padding: '6px 20px' }}
                parentStyle={{ width: 'fit-content' }}
                onClickHandler={() => window.location.replace('http://127.0.0.1:8000/Examples/Excel/products_example.xlsx')}
            />
        </div>
    )
}

export default ImportProductActions