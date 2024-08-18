import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Hedera Explorer</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/file-storage" className="nav-link">File Storage</Link>
          </li>
          <li className="nav-item">
            <Link to="/token" className="nav-link">Token Management</Link>
          </li>
          <li className="nav-item">
            <Link to="/consensus" className="nav-link">Consensus Service</Link>
          </li>
          <li className="nav-item">
            <Link to="/smart-contract" className="nav-link">Smart Contract</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;