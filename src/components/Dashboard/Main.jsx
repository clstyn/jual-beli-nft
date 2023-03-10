import React from 'react'
import { getGlobalState, useGlobalState } from "../../store"
import { Card } from '../ArtworksSect'
import Identicon from 'react-identicons'
import { ShowNFT } from "../ShowNFT";

export const Main = ({collection}) => {
    
    const account = getGlobalState('connectedAccount')
    const [profile] = useGlobalState('profile')

    return (
        <>
            {profile? (
                <div className='col-span-4 md:col-span-3'>
                    <div className="grid grid-cols-2 px-8 md:px-12 pt-8 md:py-24 md:h-full">
                        <div className="flex items-center justify-center col-span-2">
                            <Identicon string={account} size={200} className="rounded-full object-contain bg-white scale-75 md:scale-100 "/>
                        </div>
                        
                        <p className='mt-2 font-bold col-span-2 md:col-span-1'>Full Address:</p>
                        <p className='mt-2 font-bold col-span-2 md:col-span-1 break-all'>{account}</p>
                    </div>
                </div>
            ) : (
                <div className='col-span-4 md:col-span-3 p-12'>
                    <ShowNFT/>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-3 py-2.5 text-white">
                        {collection?.map((nft, i) => (
                                <Card key={i} nft={nft}>Card Component</Card>
                            ))}
                    </div> 
                </div>
            )
        }
        </>
    )
}
