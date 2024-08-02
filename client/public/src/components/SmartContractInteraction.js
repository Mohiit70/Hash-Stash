import React, { useState } from 'react';
import axios from 'axios';

function SmartContractInteraction() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/smart-contract/transfer', {
        recipient,
        amount: parseInt(amount)
      });
      setResult(`Transfer successful. Transaction ID: ${response.data.transactionId}`);
    } catch (error) {
      setResult(`Error transferring tokens: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Smart Contract Interaction</h2>
      <form onSubmit={handleTransfer}>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient Address"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button type="submit">Transfer Tokens</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default SmartContractInteraction;