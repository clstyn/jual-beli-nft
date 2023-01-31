import { connectWallet } from "../Blockchain.services"
import { useGlobalState, truncate } from "../store"

export const Navbar = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')

    return(
        <>
        <div className="h-16 flex w-full items-center justify-between font-[24px] font-bold text-white">
            <div className="cursor-pointer">PStore</div>
            <ul className="hidden md:flex items-center ml-12 gap-4">
                <li className="cursor-pointer">Market</li>
                <li className="cursor-pointer">Artist</li>
                <li className="cursor-pointer">Featured</li>
                <li className="cursor-pointer">Community</li>
            </ul>

            {!connectedAccount ? (
                <button onClick={connectWallet} className="group shadow-lg md:shadow-xl shadow-black ml-8 rounded-[16px] bg-gradient-to-br from-[#00A6A6] to-[#F08700] px-2 py-1 cursor-pointer">
                    Connect Wallet
                </button>
            ) : (
                <div className="group shadow-lg md:shadow-xl shadow-black ml-8 rounded-[16px] bg-gradient-to-br from-[#00A6A6] to-[#F08700] px-2 py-1">
                    {truncate(connectedAccount,4,4,11)}
                </div>
            )}
            
        </div>
        </>
    )
}