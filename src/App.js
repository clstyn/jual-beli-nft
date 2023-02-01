import React, { useEffect } from "react";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ArtworkSec } from "./components/ArtworksSect";
import { TransactionSec } from "./components/TransactionSect";
import { CreateNFT } from "./components/CreateNFT";
import { ShowNFT } from "./components/ShowNFT";
import { UpdateNFT } from "./components/UpdateNFT";
import { Loading } from "./components/Loading";
import { Alert } from "./components/Alert";
import { getAllNFTs, isWalletConnected } from "./Blockchain.services";

function App() {

  useEffect(() => {

    const initial = async () => {
      await isWalletConnected()
      await getAllNFTs()
    } 
    
    initial().catch(console.error)
  }, [])
  
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#001F54] via-[#034078] to-[#1282A2] px-[24px] md:px-[72px] xl:px-[172px] font-poppins">
      <div className="max-w-[1920px]">
        <Navbar/>
        <Hero/>
        <ArtworkSec/>
        <TransactionSec/>
        <CreateNFT/>
        <ShowNFT/>
        <UpdateNFT/>
        <Loading/>
        <Alert/>
      </div>
    </div>
  );
}

export default App;
