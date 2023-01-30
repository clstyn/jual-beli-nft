import Gambar from "../assets/HeroImage.png"
import { setGlobalState } from "../store"

export const Hero = () => {
  const openModal = () => {
    setGlobalState('modal', 'scale-100')
  }

  return(
    <div className="flex flex-col md:flex-row  items-center justify-center md:justify-between gap-16 min-h-screen">
        <div className="flex flex-col text-white font-poppins font-bold text-[36px] md:text-[60px] 2xl:text-[84px]">
          <h1>Buy and Sell</h1>
          <h1>great NFTs</h1>

          <button onClick={openModal}
          className="bg-pink-800 rounded-xl text-[12px] mt-8 w-1/2 py-2 hover:font-bold hover:bg-pink-900 transition-all">
            Create NFT
          </button>
        </div>
        <div className="md:w-1/2">
            <img src={Gambar} alt="" className=""/>
        </div>
        
    </div>
  )  
}