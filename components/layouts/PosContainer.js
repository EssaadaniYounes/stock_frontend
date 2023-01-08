import React from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import PosHeader from './PosHeader'

function Container(props) {
    const router = useRouter()
    const { lang } = useTranslation()
    return (
        <div dir={`${lang != "ar" ? 'ltr' : 'rtl'}`} className='flex flex-col items-start justify-start'>
            <div className="w-full h-full flex flex-col relative bg-green-300">
                <PosHeader />
                <div className='w-full'>
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default Container