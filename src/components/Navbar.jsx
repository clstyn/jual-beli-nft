export const Navbar = () => {
    return(
        <>
        <div className="h-16 hidden md:flex w-full items-center justify-between font-[24px] font-bold text-white">
            <div className="cursor-pointer">PStore</div>
            <div className="flex items-center gap-4">
                <div className="cursor-pointer">Market</div>
                <div className="cursor-pointer">Artist</div>
                <div className="cursor-pointer">Featured</div>
                <div className="cursor-pointer">Community</div>
                
                <div className="ml-8 rounded-[16px] bg-gradient-to-br from-[#00A6A6] to-[#F08700] px-2 py-1 cursor-pointer">
                    Connect Wallet
                </div>
            </div>
        </div>
        </>
    )
}