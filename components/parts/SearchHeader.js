import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import icons from '../../data/iconsComponents'
function SearchHeader() {
    const { t } = useTranslation()
    return (
        <div className='search-header'>
            <div className='w-5 h-5'>{<icons.Search />}</div>
            {t('common:actions.search')}
        </div>
    )
}

export default SearchHeader