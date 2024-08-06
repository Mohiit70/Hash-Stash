import React, { useState } from 'react';
import { useHederaClient } from '../hooks/useHederaClient';

function TokenManagement() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [result, setResult] = useState('');
  const { client } = useHederaClient();

  const handleCreateToken = async (e) => {
    e.preventDefault();
    try {
      const tokenCreateTx = await client.createToken({
        name: tokenName,
        symbol: tokenSymbol,
        initialSupply: parseInt(initialSupply)
      });
      setResult(`Token created successfully. Token ID: ${tokenCreateTx.tokenId}`);
    } catch (error) {
      setResult(`Error creating token: ${error.message}`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Token Management</h2>
      <form onSubmit={handleCreateToken}>
        <input
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="Token Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <input
          type="text"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          placeholder="Token Symbol"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <input
          type="number"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
          placeholder="Initial Supply"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Token
        </button>
      </form>
      <p className="text-gray-700 mt-4">{result}</p>
    </div>
  );
}

export default TokenManagement;