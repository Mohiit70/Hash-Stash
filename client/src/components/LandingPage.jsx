import React from 'react';
import { Link } from 'react-router-dom';
import '../style/LandingPage.css';

function LandingPage() {
  return (
    <div className="white-container landing-page">
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
        <a 
          href="https://docs.hedera.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="button secondary"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export default LandingPage;