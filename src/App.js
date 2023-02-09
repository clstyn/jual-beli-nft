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
import { About } from "./components/About";
import { Community } from "./components/Community";
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
    <div className="bg-gradient-to-br from-[#001F54] via-[#034078] to-[#1282A2] font-poppins">
      <Navbar/>
      <div className="max-w-[1920px] px-[24px] md:px-[72px] xl:px-[172px] ">
        
        <Hero/>
        <About/>
        <ArtworkSec/>
        <TransactionSec/>
        <Community/>
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
