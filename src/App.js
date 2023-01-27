import React from "react";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ArtworkSec } from "./components/ArtworksSect";
import { TransactionSec } from "./components/TransactionSect";

function App() {
  return (
    <div className="bg-gradient-to-br from-[#001F54] via-[#034078] to-[#1282A2] px-[24px] md:px-[72px] xl:px-[172px] font-poppins ">
      <Navbar/>
      <Hero/>
      <ArtworkSec/>
      <TransactionSec/>
    </div>
  );
}

export default App;
