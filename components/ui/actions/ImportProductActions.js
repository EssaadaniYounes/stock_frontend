import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import icons from '@/data/iconsComponents'
import { Button, LinkButton } from '@/components/parts'

function ImportProductActions() {
    const { t } = useTranslation()
    return (
        <div className='flex items-center justify-end'>

            <Button title={t('common:actions.download_examples')}
                className='purple-button'
                icon={<icons.Plus />}
                style={{ fontSize: '12px', padding: '6px 20px' }}
                parentStyle={{ width: 'fit-content' }}
                onClickHandler={() => console.log('download')}
            />
        </div>
    )
}

export default ImportProductActions