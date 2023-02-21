import React, { useEffect } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Loading } from "./components/Loading";
import { Alert } from "./components/Alert";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

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
    <>
      <Router>
        <Routes>
          <Route path="/dev/fio/marketplace" element={<Home/>}/>
          <Route path="/dev/fio/marketplace/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
      <Loading/>
      <Alert/>
    </>
  );
}

export default App;
