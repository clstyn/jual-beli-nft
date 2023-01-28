import {BiTransfer} from 'react-icons/bi'
import {MdOpenInNew} from 'react-icons/md'

export const TransactionSec = () => {
    return(
        <div className="min-h-screen ">
            <h1 className="font-poppins text-white font-bold text-[18px] md:text-[36px] 2xl:text-[48px]">LATEST TRANSACTIONS</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-2 py-2.5">
                {Array(3)
                    .fill()
                    .map((tx, i) => (
                        <TransCard key={i} tx={i}/>
                    ))}
            </div>

            
            <div className="text-center mb-5">
                <button className="shadow-lg shadow-black bg-pink-500 hover:bg-pink-800 rounded-full text-white font-bold px-2 py-1 max-md:text-sm ">Load More</button>
            </div>
            
        </div>
    )
}

const TransCard = ({tx}) => (
    <div className="flex justify-between items-center border border-pink-500 text-white w-full shadow-lg shadow-black rounded-md bg-gray-800 my-2 p-3">
        <div className='rounded-md shadow-sm shadow-pink-500 p-2'>
            <BiTransfer/>
        </div>

        <div>
            <h4 className="text-sm">#{tx} Fund Transferred</h4>
            <small className="flex justify-start items-center">
                <span className="mr-1">Received by</span>
                <a href="#" target="_blank" className="text-pink-500 mr-2">0x39...037e</a>
                <MdOpenInNew/>
            </small>
        </div>

        <p className='text-sm font-medium'>0.32 ETH</p>
    </div>
)