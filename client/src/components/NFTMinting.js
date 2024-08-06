import React, { useState } from 'react';
import axios from 'axios';

function NFTMinting() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [metadata, setMetadata] = useState('');
  const [result, setResult] = useState('');

  const handleMint = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/nft/mint', {
        name,
        symbol,
        metadata
      });
      setResult(`NFT minted successfully. Token ID: ${response.data.tokenId}`);
    } catch (error) {
      setResult(`Error minting NFT: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>NFT Minting</h2>
      <form onSubmit={handleMint}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="NFT Name"
        />
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="NFT Symbol"
        />
        <textarea
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          placeholder="NFT Metadata (JSON)"
        />
        <button type="submit">Mint NFT</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default NFTMinting;