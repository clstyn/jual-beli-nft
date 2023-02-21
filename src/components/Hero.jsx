import Gambar from "../assets/HeroImage.png"
import { setGlobalState } from "../store"
import { motion } from "framer-motion"

export const Hero = () => {
  const openModal = () => {
    setGlobalState('modal', 'scale-100')
  }

  return(
    <div className="relative flex flex-col md:flex-row  items-center justify-center md:justify-between gap-16 min-h-screen">
        {/* ornamen */}
        <motion.div className="grid grid-cols-3 grid-rows-3 h-8 w-8 md:h-16 md:w-16 gap-2 md:gap-4 absolute top-0 left-[28px]"
        animate={{x: [null, 100, 0]}}
        transition={{ duration: 3, repeat: Infinity }}>
          <div className="h-full w-full bg-rose-500"></div>
          <div className="h-full w-full bg-rose-500"></div>
          <div className="h-full w-full bg-rose-500"></div>
          <div className="h-full w-full bg-rose-500"></div>
          <div className="h-full w-full bg-rose-500"></div>
          <div className="h-full w-full bg-rose-500"></div>
          <div className="h-full w-full bg-rose-500"></div>
          <div className="h-full w-full bg-rose-500"></div>
          <div className="h-full w-full bg-rose-500"></div>
        </motion.div>
        <motion.div className="grid grid-cols-3 grid-rows-3 h-8 w-8 md:h-16 md:w-16 gap-2 md:gap-4 absolute top-12 md:top-24 left-0"
        animate={{x: [100, 0, 100]}}
        transition={{ duration: 3, repeat: Infinity }}>
          <div className="h-full w-full bg-orange-500"></div>
          <div className="h-full w-full bg-orange-500"></div>
          <div className="h-full w-full bg-orange-500"></div>
          <div className="h-full w-full bg-orange-500"></div>
          <div className="h-full w-full bg-orange-500"></div>
          <div className="h-full w-full bg-orange-500"></div>
          <div className="h-full w-full bg-orange-500"></div>
          <div className="h-full w-full bg-orange-500"></div>
          <div className="h-full w-full bg-orange-500"></div>
        </motion.div>
        <div className="flex flex-col text-white font-poppins font-bold text-[36px] md:text-[60px] 2xl:text-[84px]">
          <h1>Buy and Sell</h1>
          <h1>great NFTs</h1>

          <button onClick={openModal}
          className="bg-pink-800 rounded-xl text-[12px] mt-8 w-1/2 py-2 hover:font-bold hover:bg-pink-900 transition-all">
            Create NFT
          </button>
        </div>
        <motion.div className="md:w-1/2" 
        animate={{scale:[1, 1.1, 1.1, 1, 1]}}
        transition={{ ease: "linear", duration: 5, repeat: Infinity}}>
            <img src={Gambar} alt="" className=""/>
        </motion.div>
        
    </div>
  )  
}