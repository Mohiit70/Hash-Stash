import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-6">Decentralized File Storage</h1>
      <p className="text-xl mb-8">Secure, fast, and decentralized file storage powered by Hedera Hashgraph</p>
      <Link to="/file-storage" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Get Started
      </Link>
    </div>
  );
}

export default LandingPage;