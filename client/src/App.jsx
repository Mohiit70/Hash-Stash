import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FileStorage from './components/FileStorage';
import TokenManagement from './components/TokenManagement';
import ConsensusService from './components/ConsensusService';
import SmartContractInteraction from './components/SmartContractInteraction';
import NFTMinting from './components/NFTMinting';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="container mx-auto mt-8 px-4">
          <Routes>
            <Route path="/" element={<FileStorage />} />
            <Route path="/token" element={<TokenManagement />} />
            <Route path="/consensus" element={<ConsensusService />} />
            <Route path="/smart-contract" element={<SmartContractInteraction />} />
            <Route path="/nft" element={<NFTMinting />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;