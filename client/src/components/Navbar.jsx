import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Hash Stash
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/file-storage">File Storage</Link>
          </li>
          <li>
            <Link to="/token">Token Management</Link>
          </li>
          <li>
            <Link to="/consensus">Consensus Service</Link>
          </li>
          <li>
            <Link to="/smart-contract">Smart Contract</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;