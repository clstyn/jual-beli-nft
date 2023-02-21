import React, { useState, useEffect } from 'react'
import { getGlobalState, setGlobalState, useGlobalState } from "../store"

export const ArtworkSec = () => {
    const account = getGlobalState('connectedAccount')
    const [nfts] = useGlobalState('nfts')
    const [end, setEnd] = useState(4)
    const [count] = useState(4)
    const [collection, setCollection] = useState([])

    useEffect(() => {
      setCollection(nfts.slice(0, end))
    }, [nfts, end])

    const seeOwned = () => {
        const filtered = nfts.filter((item) => {
            return item.owner === account
        })
        setCollection(filtered)
    }

    const seeAll = () => {
        setCollection(nfts.slice(0, end))
    }

    const searchAssets = (e) => {
        const filtered = nfts.filter((item) => {
            return item.title.toLowerCase().includes(e.target.value)
        })
        setCollection(filtered)
    }
    
    return(
        <div className="min-h-screen" id="artworks">
            <h1 className="font-poppins text-white font-bold text-[18px] md:text-[36px] 2xl:text-[48px]">
                {nfts.length > 0 ? 'LATEST ARTWORKS' : 'NO ARTWORKS YET'}
            </h1>

            <div className="w-full flex flex-col sm:flex-row justify-between">
                <div className='flex gap-8'>
                    <label className='text-white font-poppins text-lg md:text-2xl'>
                        <input type="radio" name="owned" id="0" className='mr-2 md:mr-4 md:scale-[2]' onChange={()=>seeAll()} />
                        All
                    </label>
                    <label className='text-white font-poppins text-lg md:text-2xl'>
                        <input type="radio" name="owned" id="1" className='mr-2 md:mr-4 md:scale-[2]' onChange={()=>seeOwned()}/>
                        Owned
                    </label>
                </div>
                <div className='sm:w-1/2 md:w-1/4'>
                    <input 
                    type="text"
                    className="border-none rounded-md text-md mt-4 sm:mt-0 pl-4 py-1 w-full" 
                    placeholder="Search assets title..."
                    onChange={searchAssets}/>
                </div>
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5 text-white">
                {collection.map((nft, i) => (
                        <Card key={i} nft={nft}>Card Component</Card>
                    ))}
            </div>
            
            {collection.length > 0 && nfts.length > collection.length ? (
                <div className="text-center mb-5">
                    <button 
                    onClick={() => setEnd(end+count)}
                    className="shadow-lg shadow-black bg-pink-500 hover:bg-pink-800 rounded-full text-white font-bold px-2 py-1 max-md:text-sm mt-4">Load More</button>
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