import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Hedera Explorer</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-blue-200">File Storage</Link></li>
          <li><Link to="/token" className="text-white hover:text-blue-200">Token Management</Link></li>
          <li><Link to="/consensus" className="text-white hover:text-blue-200">Consensus Service</Link></li>
          <li><Link to="/smart-contract" className="text-white hover:text-blue-200">Smart Contract</Link></li>
          <li><Link to="/nft" className="text-white hover:text-blue-200">NFT Minting</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;