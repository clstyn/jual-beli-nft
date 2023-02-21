import React from 'react'
import { getGlobalState, truncate } from "../../store"

import Identicon from 'react-identicons'
import { Navigate, useNavigate } from 'react-router-dom'

export const Side = () => {
    
    const account = getGlobalState('connectedAccount')

    const navigate = useNavigate();

    return (
    <div className='col-span-4 md:col-span-1 bg-blue-800 shadow-xl shadow-black h-1/2 md:h-auto'>
        <div className="flex flex-col-reverse md:flex-col items-center justify-center pt-8 md:py-24 md:h-full">
            <div className='text-center' >
                <Identicon string={account} size={120} className="rounded-full object-contain bg-white"/>
                <p className='mt-2 font-bold'>{truncate(account,4,4,11)}</p>
            </div>
        
            <div className='my-4 md:my-24 items-center justify-center w-full flex gap-8 md:flex-col'>
                <div className='cursor-pointer hover:font-bold'>Profile</div>
                <div className='cursor-pointer hover:font-bold'>My NFTs</div>
            </div>
            <div className="hover:underline cursor-pointer" onClick={()=> navigate('/dev/fio/marketplace')}>&larr; Back to Home</div>
        </div>
    </div>
    )
}
