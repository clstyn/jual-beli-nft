import React from 'react'
import { motion } from 'framer-motion'

export const About = () => {
  return (
    <div className='relative text-white md:text-3xl py-24' id='about'>
      {/* <motion.div className="h-32 w-32 absolute top-0 right-0 bg-green-600 -z-1 translate-x-20"
       animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"]}}
        transition={{ duration: 3, repeat: Infinity }}>
      </motion.div> */}
      <p>
        PStore is an NFT marketplace where you can sell and buy collections. Discover many awesome collections here!
      </p>
      <small className='text-xs mt-8'>
        Make sure to connect your wallet to Goerli Network
      </small>
    </div>
  )
}
