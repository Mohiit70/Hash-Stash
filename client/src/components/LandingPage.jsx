import React from 'react';
import { Link } from 'react-router-dom';
import '../style/LandingPage.css';
import { useTheme } from '../contexts/ThemeContext';

function LandingPage() {
  const { theme } = useTheme();

  return (
    <div className={`landing-page ${theme}`}>
      <div className="content">
        <h1 className="title">
          Welcome to
          <span className="highlight">Hash Stash</span>
        </h1>
        <p className="description">
          Explore the power of Hedera Hashgraph with our intuitive tools
          for file storage, token management, consensus services, and
          smart contracts.
        </p>
        <div className="button-container">
          <Link to="/file-storage" className="button primary">
            Get Started
          </Link>
          <Link to="https://docs.hedera.com/hedera" className="button secondary">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;