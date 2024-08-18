import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">File Storage</Link></li>
        <li><Link to="/token">Token Management</Link></li>
        <li><Link to="/consensus">Consensus Service</Link></li>
        <li><Link to="/smart-contract">Smart Contract</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;