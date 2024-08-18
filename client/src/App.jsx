import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import FileStorage from './components/FileStorage';
import TokenManagement from './components/TokenManagement';
import ConsensusService from './components/ConsensusService';
import SmartContractInteraction from './components/SmartContractInteraction';
import { HederaProvider } from './contexts/HederaContext';
import './App.css';

function App() {
  return (
    <Router>
      <HederaProvider>
        <div className="app-container">
          <Navbar />
          <main className="content-container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/file-storage" element={<FileStorage />} />
              <Route path="/token" element={<TokenManagement />} />
              <Route path="/consensus" element={<ConsensusService />} />
              <Route path="/smart-contract" element={<SmartContractInteraction />} />
            </Routes>
          </main>
        </div>
      </HederaProvider>
    </Router>
  );
}

export default App;