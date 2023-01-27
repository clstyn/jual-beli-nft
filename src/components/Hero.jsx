import Gambar from "../assets/HeroImage.png"

export const Hero = () => {
  return(
    <div className="flex flex-col md:flex-row  items-center justify-center md:justify-between gap-16 min-h-screen">
        <div className="flex flex-col text-white font-poppins font-bold text-[36px] md:text-[60px] 2xl:text-[84px]"><h1>Buy and Sell</h1>
        <h1>great NFTs</h1></div>
        <div className="md:w-1/2">
            <img src={Gambar} alt="" className=""/>
        </div>
        
    </div>
  )  
}