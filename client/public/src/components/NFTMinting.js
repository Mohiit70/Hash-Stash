import React, { useState } from 'react';
import { useHederaClient } from '../hooks/useHederaClient';

function NFTMinting() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [metadata, setMetadata] = useState('');
  const [result, setResult] = useState('');
  const { client } = useHederaClient();

  const handleMint = async (e) => {
    e.preventDefault();
    try {
      const nftMintTx = await client.mintNFT({
        name,
        symbol,
        metadata
      });
      setResult(`NFT minted successfully. Token ID: ${nftMintTx.tokenId}`);
    } catch (error) {
      setResult(`Error minting NFT: ${error.message}`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">NFT Minting</h2>
      <form onSubmit={handleMint}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="NFT Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="NFT Symbol"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <textarea
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          placeholder="NFT Metadata (JSON)"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Mint NFT
        </button>
      </form>
      <p className="text-gray-700 mt-4">{result}</p>
    </div>
  );
}

export default NFTMinting;
