import React, { useState } from 'react';
import { useHederaContext } from '../contexts/HederaContext';
import { TokenCreateTransaction, TokenInfoQuery } from '@hashgraph/sdk';
import '../style/TokenManagement.css';

function TokenManagement() {
  const { client } = useHederaContext();
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [tokenInfo, setTokenInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateToken = async (e) => {
    e.preventDefault();
    if (!client) return;

    try {
      const transaction = await new TokenCreateTransaction()
        .setTokenName(tokenName)
        .setTokenSymbol(tokenSymbol)
        .setDecimals(0)
        .setInitialSupply(1000)
        .setTreasuryAccountId(client.operatorAccountId)
        .freezeWith(client);

      const txResponse = await transaction.execute(client);
      const receipt = await txResponse.getReceipt(client);
      setTokenId(receipt.tokenId.toString());
    } catch (error) {
      setError('Error creating token');
      console.error('Error creating token:', error);
    }
  };

  const handleGetTokenInfo = async () => {
    if (!tokenId || !client) return;

    try {
      const query = new TokenInfoQuery().setTokenId(tokenId);
      const tokenInfo = await query.execute(client);
      setTokenInfo(tokenInfo);
    } catch (error) {
      setError('Error getting token info');
      console.error('Error getting token info:', error);
    }
  };

  return (
    <div className="token-management">
      <h2>Token Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="token-form" onSubmit={handleCreateToken}>
        <input
          className="token-input"
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <input
          className="token-input"
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
        />
        <button className="create-token-button" type="submit">Create Token</button>
      </form>
      {tokenId && (
        <div>
          <p>Token ID: {tokenId}</p>
          <button className="create-token-button" onClick={handleGetTokenInfo}>Get Token Info</button>
        </div>
      )}
      {tokenInfo && (
        <div>
          <h3>Token Info:</h3>
          <p>Name: {tokenInfo.name}</p>
          <p>Symbol: {tokenInfo.symbol}</p>
          <p>Total Supply: {tokenInfo.totalSupply.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default TokenManagement;
