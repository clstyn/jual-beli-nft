import React from 'react'
import { useGlobalState } from '../store'

export const Loading = () => {
  const [loading] = useGlobalState('loading')
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition ${loading.show? 'scale-100' : 'scale-0' }`}>
        <div className="bg-gray-700 shadow-md shadow-pink-500 rounded-xl min-w-min px-10 pb-2">
            <div className="flex flex-col">
                <div className="flex justify-center items-center">
                    <div className='lds-dual-ring'></div>
                    <p className="text-lg text-white ml-4">
                        Processing...
                    </p>
                </div>
                <small className='text-center text-white'>{loading.msg}</small>
            </div>
        </div>
    </div>
  )
}
