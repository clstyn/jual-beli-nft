import Identicon from 'react-identicons'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import GambarDummy from '../assets/dummy.jpg'

export const ShowNFT = () => {
    const [modal] = useGlobalState('showModal')
    
    const handleSubmit = () => {
        closeModal()
    }

    const closeModal = () => {
        setGlobalState('showModal', 'scale-0');
    }
    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition ${modal}`}>
            <div className="bg-gray-800 shadow-xl shadow-pink-800 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <p className="font-semibold text-white">Buy NFT</p>
                        <button type="button" className="border-0 bg-transparent focus:outline-none text-white" onClick={closeModal}>
                            <FaTimes/>
                        </button>
                    </div>

                    <div className='flex items-center justify-center rounded-xl mt-5'>
                        <div className='shrink-0 rounded-xl overflow-hidden h-20 w-20 '>
                            <img className="h-full w-full object-cover cursor-pointer" src={GambarDummy} alt="NFT" />
                        </div>
                    </div>
                    
                    <div className="flex flex-col justify-start rounded-xl mt-5">
                        <h1 className="text-white font-semibold">
                            Title
                        </h1>
                        <p className="text-gray-400 text-xs my-1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, qui! Recusandae cum dolor rem debitis, soluta laborum quae expedita harum sunt illo obcaecati ab corporis accusantium modi eaque voluptatibus maiores.
                        </p>

                        <div className="flex justify-between items-center space-x-2 mt-4">
                            <div className='flex justify-start items-center'>
                                <Identicon string={'adhsdafhgjgjf'} size={50} className="h-10 w-10 object-contain rounded-full mr-3"/>

                                <div className='flex flex-col justify-center items-start'>
                                    <small className='text-white font-bold'>@owner</small>
                                    <small className='text-pink-500 font-semibold'>0x31...1298</small>
                                </div>
                            </div>

                            <div className='text-white flex flex-col'>
                                <small className='text-xs'>Current Price</small>
                                <p className='text-sm font-semibold'>0.34 ETH</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center space-x-2">
                        <button
                            // onClick={handleSubmit}
                            className="flex flex-row justify-center items-center
                            w-full text-white text-md bg-pink-800 py-2 px-5 rounded-full
                            drop-shadow-xl border border-transparent
                            hover:border hover:bg-pink-900 hover:font-semibold
                            focus:outline-none focus:ring mt-5 transition-all"
                        >
                            Purchase
                        </button>
                        <button
                            onClick={() => {
                                setGlobalState('showModal', 'scale-0')
                                setGlobalState('updateModal', 'scale-100')}}
                            className="flex flex-row justify-center items-center
                            w-full text-white text-md bg-pink-800 py-2 px-5 rounded-full
                            drop-shadow-xl border border-transparent
                            hover:border hover:bg-pink-900 hover:font-semibold
                            focus:outline-none focus:ring mt-5 transition-all"
                        >
                            Change Price
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}