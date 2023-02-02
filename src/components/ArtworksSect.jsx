import React, { useState, useEffect } from 'react'
import { getGlobalState, setGlobalState, useGlobalState } from "../store"

export const ArtworkSec = () => {
    const [nfts] = useGlobalState('nfts')
    const [end, setEnd] = useState(4)
    const [count] = useState(4)
    const [collection, setCollection] = useState([])

    const getCollection = () => {
        return nfts.slice(0, end)
    }

    useEffect(() => {
      setCollection(getCollection())
    }, [])
    

    return(
        <div className="min-h-screen">
            <h1 className="font-poppins text-white font-bold text-[18px] md:text-[36px] 2xl:text-[48px]">
                {nfts.length > 0 ? 'LATEST ARTWORKS' : 'NO ARTWORKS YET'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5 text-white">
                {nfts.map((nft, i) => (
                        <Card key={i} nft={nft}>Card Component</Card>
                    ))}
            </div>
            
            {collection.length > 0 && nfts.length > collection.length ? (
                <div className="text-center mb-5">
                    <button 
                    onClick={() => setEnd(end+count)}
                    className="shadow-lg shadow-black bg-pink-500 hover:bg-pink-800 rounded-full text-white font-bold px-2 py-1 max-md:text-sm ">Load More</button>
                </div>
            ) : null }
            
        </div>
    )
}

const Card = ({nft}) => {

    const setNft = () => {
        setGlobalState('nft', nft)
        setGlobalState('showModal', 'scale-100')
    }
    
    return (
        <div className="w-full shadow-lg shadow-black rounded-md bg-gray-900 my-2 p-3">
        <img className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3" src={nft.metadataURI} alt={nft.title}/>
        <h4 className="font-semibold">{nft.title}</h4>
        <p className="text-gray-400 text-xs my-1">{nft.description}</p>
        <div className="flex justify-between items-center mt-3">
            <div className="flex flex-col">
                <small className="text-xs">Current Price</small>
                <p className="text-sm font-semibold">{nft.cost} ETH</p>
            </div>
            <button 
                onClick={setNft}
                className="shadow-lg shadow-black text-sm bg-pink-600 px-4 py-1 rounded-full hover:bg-red-600 ">View Details</button>
        </div>
    </div>
    )
    
}