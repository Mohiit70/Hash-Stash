import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import FileStorage from './components/FileStorage';
import TokenManagement from './components/TokenManagement';
import ConsensusService from './components/ConsensusService';
import SmartContractInteraction from './components/SmartContractInteraction';
import { HederaProvider } from './contexts/HederaContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Router>
      <HederaProvider>
        <ThemeProvider>
          <div className="app-container">
            <Navbar />
            <div className="content-container">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/file-storage" element={<FileStorage />} />
                <Route path="/token" element={<TokenManagement />} />
                <Route path="/consensus" element={<ConsensusService />} />
                <Route path="/smart-contract" element={<SmartContractInteraction />} />
              </Routes>
            </div>
            <div
              className={`custom-cursor ${isHovering ? 'hover' : ''}`}
              style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
            />
          </div>
        </ThemeProvider>
      </HederaProvider>
    </Router>
  );
}

export default App;