import React from 'react'
import { CurrentPageHeader } from '../../components/layouts'
import icons from '../../data/iconsComponents'
function index() {

    return (
        <div className=''>
            <CurrentPageHeader icon={icons.DashBoard} title="Home" />
        </div>
    )
}

export default index