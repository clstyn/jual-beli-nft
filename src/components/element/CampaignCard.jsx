import ProgressBar from "./ProgressBar"
import { setGlobalState } from "../../store"

export default function CampaignCard({
    title, desc, goal=1, currentFund=0.3
}){
    const openModal = () => {
        setGlobalState("modal", "scale-100")
    }
    return(
        <div className='w-full px-[40px] pt-[30px] pb-[50px]  bg-black/20 backdrop-blur-md rounded-[20px] border-[0.5px] border-glass flex flex-col gap-[25px]'>
                <div className='flex items-center justify-between '>
                    <h2 className='text-[14px] md:text-[16px] 2xl:text-[24px]'>{title}</h2>
                    <div className=' flex flex-row justify-end items-center gap-[30px] w-1/2'>
                        <h2 className='w-full text-right'>Goal: {goal} ETH</h2>
                        <ProgressBar
                            currentFund={currentFund}
                            setGoal={goal}
                        />
                        <button
                        onClick={openModal}
                        className="bg-pink-800 rounded-xl text-[12px]  hover:font-bold hover:bg-pink-900 transition-all w-full py-2">Join Campaign</button>
                    </div>
                </div>
                <p className='text-sm '>{desc}</p>
            </div>
    )
}