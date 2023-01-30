import GambarDummy from "../assets/dummy.jpg"
import { setGlobalState } from "../store"

export const ArtworkSec = () => {
    return(
        <div className="min-h-screen">
            <h1 className="font-poppins text-white font-bold text-[18px] md:text-[36px] 2xl:text-[48px]">LATEST ARTWORKS</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5 text-white">
                {Array(4)
                    .fill()
                    .map((nft, i) => (
                        <Card key={i} nft={nft+1}>Card Component</Card>
                    ))}
            </div>
            
            <div className="text-center mb-5">
                <button className="shadow-lg shadow-black bg-pink-500 hover:bg-pink-800 rounded-full text-white font-bold px-2 py-1 max-md:text-sm ">Load More</button>
            </div>
            
        </div>
    )
}

const Card = ({nft}) => (
    <div className="w-full shadow-lg shadow-black rounded-md bg-gray-900 my-2 p-3">
        <img className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3" src={GambarDummy} alt={"NFT Images"}/>
        <h4 className="font-semibold">NFT #{nft}</h4>
        <p className="text-gray-400 text-xs my-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi et distinctio quibusdam nihil odio numquam? Iure eos obcaecati facilis ut fuga officia repudiandae. A quam totam nihil, soluta sed et?</p>
        <div className="flex justify-between items-center mt-3">
            <div className="flex flex-col">
                <small className="text-xs">Current Price</small>
                <p className="text-sm font-semibold">0.34 ETH</p>
            </div>
            <button 
                onClick={()=> setGlobalState('showModal', 'scale-100')}
                className="shadow-lg shadow-black text-sm bg-pink-600 px-4 py-1 rounded-full hover:bg-red-600 ">View Details</button>
        </div>
    </div>
)