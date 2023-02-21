import React, { useEffect, useState } from 'react'
import { getGlobalState, setGlobalState, useGlobalState } from "../../store"

import { Side } from './Side'

import Identicon from 'react-identicons'

export const MainDashboard = () => {
    const account = getGlobalState('connectedAccount')
    const [nfts] = useGlobalState('nfts')

    const [myColl, setMyColl] = useState()

    useEffect(() => {
        const filtered = nfts.filter((item) => {
            return item.owner === account
        })
        setMyColl(filtered)
    }, [nfts])

    return (
        <div className='h-screen w-full bg-indigo-900 text-white font-poppins grid grid-cols-4 md:overflow-hidden'>
            <Side/>
        </div>
    )
}
