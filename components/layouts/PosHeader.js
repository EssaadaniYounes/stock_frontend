import React from 'react'
import { Button } from '../parts'
import icons from '@/data/iconsComponents'
import { useRouter } from 'next/router';
function PosHeader() {
    const router = useRouter();
    return (
        <div className="w-full min-h-[56px] bg-green-500 flex items-center justify-between px-4">
            <Button title="Back to list"
                className="hovered-yellow-button"
                onClickHandler={() => router.push('/dashboard/pos')}
                parentStyle={{ width: '200px' }}
                icon={<icons.Back />}
                style={{ color: 'white', margin: '0' }}
            />
            <Button title="Back to dashboard"
                className="hovered-yellow-button"
                onClickHandler={() => router.push('/dashboard')}
                parentStyle={{ width: '200px' }}
                icon={<icons.Back />}
                style={{ color: 'white', margin: '0' }} />
        </div>
    )
}

export default PosHeader