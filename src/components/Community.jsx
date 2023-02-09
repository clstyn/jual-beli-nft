import React from 'react'
import { BsGithub } from 'react-icons/bs'

export const Community = () => {
  return (
    <div className='text-white md:text-3xl py-24' id='community'>
        <h1 className="font-poppins text-white font-bold text-[18px] md:text-[36px] 2xl:text-[48px]">
            FURTHER CONTACT
        </h1>
        <p className='mt-4 text-base'>
            If you want to visit the source code and use it for future development, click below
        </p>
        <a href="https://github.com/clstyn/jual-beli-nft" className='mt-2 block w-4' target='_blank' rel='noopener noreferrer'>
            <BsGithub className='text-4xl hover:text-black transition'>
            </BsGithub>
        </a>
    </div>
  )
}
