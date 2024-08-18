import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-textLight text-xl font-bold">Hedera Explorer</Link>
        <ul className="flex space-x-4 text-textLight">
          <li className="hover:text-accent"><Link to="/">File Storage</Link></li>
          <li className="hover:text-accent"><Link to="/token">Token Management</Link></li>
          <li className="hover:text-accent"><Link to="/consensus">Consensus Service</Link></li>
          <li className="hover:text-accent"><Link to="/smart-contract">Smart Contract</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;