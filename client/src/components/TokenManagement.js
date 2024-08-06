import React, { useState } from 'react';
import axios from 'axios';

function TokenManagement() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [result, setResult] = useState('');

  const handleCreateToken = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/token/create', {
        name: tokenName,
        symbol: tokenSymbol,
        initialSupply: parseInt(initialSupply)
      });
      setResult(`Token created successfully. Token ID: ${response.data.tokenId}`);
    } catch (error) {
      setResult(`Error creating token: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Token Management</h2>
      <form onSubmit={handleCreateToken}>
        <input
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="Token Name"
        />
        <input
          type="text"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          placeholder="Token Symbol"
        />
        <input
          type="number"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
          placeholder="Initial Supply"
        />
        <button type="submit">Create Token</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default TokenManagement;