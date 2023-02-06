import { connectWallet } from "../Blockchain.services"
import { useGlobalState, truncate, setAlert } from "../store"

export const Navbar = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')

    const scrollToAbout = () => {
        document.getElementById("about").scrollIntoView({behavior: "smooth"})
    }

    const scrollToArt = () => {
        document.getElementById("artworks").scrollIntoView({behavior: "smooth"})
    }
   
    return(
        <>
        <div className="h-16 flex w-full items-center justify-between font-[24px] text-white px-8 backdrop-blur-lg sticky top-0">
            <div className="cursor-pointer font-bold ">PStore</div>
            <ul className="hidden md:flex items-center ml-12 gap-4 ">
                <li className="cursor-pointer ">
                    <button 
                    className="hover:font-bold "
                    onClick={scrollToAbout}>About</button>
                </li>
                <li className="cursor-pointer ">
                    <button 
                    className="hover:font-bold "
                    onClick={scrollToArt}>Market</button>
                </li>
                <li className="cursor-pointer ">
                    <button 
                    className="hover:font-bold "
                    onClick={() => setAlert('This section is under construction', 'red')}>Community</button>
                </li>
            </ul>

            {!connectedAccount ? (
                <button onClick={connectWallet} className="group shadow-lg md:shadow-xl shadow-black ml-8 rounded-[16px] bg-gradient-to-br from-[#00A6A6] to-[#F08700] px-2 py-1 cursor-pointer font-bold">
                    Connect Wallet
                </button>
            ) : (
                <div className="group shadow-lg md:shadow-xl font-bold shadow-black ml-8 rounded-[16px] bg-gradient-to-br from-[#00A6A6] to-[#F08700] px-2 py-1">
                    {truncate(connectedAccount,4,4,11)}
                </div>
            )}

            
            
        </div>
        </>
    )
}