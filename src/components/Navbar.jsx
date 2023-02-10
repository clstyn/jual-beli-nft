import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
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

    const scrollToTx = () => {
        document.getElementById("transactions").scrollIntoView({behavior: "smooth"})
    }

    const scrollToCon = () => {
        document.getElementById("community").scrollIntoView({behavior: "smooth"})
    }
   
    return(
        <>
        <div className="z-50 h-16 flex w-full items-center justify-between font-[24px] text-white px-8 backdrop-blur-lg sticky top-0">
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
                    onClick={scrollToTx}>Community</button>
                </li>
            </ul>

            {!connectedAccount ? (
                <button onClick={connectWallet} className="group shadow-lg md:shadow-xl shadow-black ml-8 rounded-[16px] bg-gradient-to-br from-[#00A6A6] to-[#F08700] px-2 py-1 cursor-pointer font-bold">
                    Connect Wallet
                </button>
            ) : (
                <>
                    <div className="hidden md:block group shadow-lg md:shadow-xl font-bold shadow-black ml-8 rounded-[16px] bg-gradient-to-br from-[#00A6A6] to-[#F08700] px-2 py-1">
                        {truncate(connectedAccount,4,4,11)}
                    </div>
                    <div className="md:hidden">
                        <Menu as="div" className="shadow-lg md:shadow-xl font-bold shadow-black ml-8 rounded-[16px] bg-gradient-to-br from-[#00A6A6] to-[#F08700] px-2 py-1 relative inline-block text-left">
                            <Menu.Button>{truncate(connectedAccount,4,4,11)}</Menu.Button>
                            <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className='flex flex-col absolute top-10 z-50 p-4 -translate-x-6 items-start rounded-lg backdrop-blur-md bg-[rgba(10,17,40,0.3)] '>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <button
                                        className={`${active && 'bg-blue-500'}`}
                                        onClick={scrollToAbout}
                                        >
                                        About
                                        </button>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                            className={`${active && 'bg-blue-500'}`}
                                            onClick={scrollToArt}
                                            >
                                            Market
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                            className={`${active && 'bg-blue-500'}`}
                                            onClick={scrollToTx}
                                            >
                                            Transactions
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                            className={`${active && 'bg-blue-500'}`}
                                            onClick={scrollToCon}
                                            >
                                            Community
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </>
            )}

            
            
        </div>
        </>
    )
}