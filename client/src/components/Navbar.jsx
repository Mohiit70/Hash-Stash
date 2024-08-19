import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaGithub } from 'react-icons/fa';
import '../style/Navbar.css';
import { useTheme } from '../contexts/ThemeContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          Hash Stash
        </Link>
        <ul className="nav-links">
          <li><Link to="/file-storage">File Storage</Link></li>
          <li><Link to="/token">Token Management</Link></li>
          <li><Link to="/consensus">Consensus Service</Link></li>
          <li><Link to="/smart-contract">Smart Contract</Link></li>
          <li>
            <a href="https://github.com/Mohiit70/Hash-Stash" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        </ul>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;