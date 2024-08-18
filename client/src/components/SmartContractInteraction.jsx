import React, { useState } from 'react';
import { useHederaContext } from '../contexts/HederaContext'; // Correct import
import { ContractCreateTransaction, ContractExecuteTransaction, ContractFunctionParameters } from '@hashgraph/sdk';

function SmartContractInteraction() {
  const { client } = useHederaContext();
  const [contractId, setContractId] = useState('');
  const [message, setMessage] = useState('');
  const [retrievedMessage, setRetrievedMessage] = useState('');
  const [error, setError] = useState(null);

  // This is a simple Solidity contract bytecode for demonstration.
  const contractBytecode = '608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063368b87721461003b578063ce6d41de146100bc575b600080fd5b6100ba6004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610139565b005b6100c4610143565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101045780820151818401526020810190506100e9565b50505050905090810190601f1680156101315780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b8060009080519060200190610150929190610154565b50565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101ea5780601f106101bf576101008083540402835291602001916101ea565b820191906000526020600020905b8154815290600101906020018083116101cd5757829003601f168201915b505050505081565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061023557805160ff1916838001178555610263565b82800160010185558215610263579182015b82811115610262578251825591602001919060010190610247565b5b5090506102709190610274565b5090565b61029691905b8082111561029257600081600090555060010161027a565b5090565b9056fea265627a7a72315820f06085b229f27f9ad48b2ff3dd9736e159a2e09daf79f76492a1b926f3ea236364736f6c63430005100032';

  const handleDeployContract = async () => {
    if (!client) return;

    try {
      const transaction = await new ContractCreateTransaction()
        .setBytecode(contractBytecode)
        .setGas(100000);

      const txResponse = await transaction.execute(client);
      const receipt = await txResponse.getReceipt(client);
      setContractId(receipt.contractId.toString());
    } catch (error) {
      setError('Error deploying contract');
      console.error('Error deploying contract:', error);
    }
  };

  const handleSetMessage = async (e) => {
    e.preventDefault();
    if (!contractId || !message || !client) return;

    try {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("setMessage", new ContractFunctionParameters().addString(message));

      await transaction.execute(client);
      setMessage('');
      console.log('Message set successfully');
    } catch (error) {
      setError('Error setting message');
      console.error('Error setting message:', error);
    }
  };

  const handleGetMessage = async () => {
    if (!contractId || !client) return;

    try {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("getMessage");

      const txResponse = await transaction.execute(client);
      const result = await txResponse.getRecord(client);
      const message = result.contractFunctionResult.getString(0);
      setRetrievedMessage(message);
    } catch (error) {
      setError('Error getting message');
      console.error('Error getting message:', error);
    }
  };

  return (
    <div>
      <h2>Smart Contract Interaction</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleDeployContract}>Deploy Contract</button>
      {contractId && (
        <div>
          <p>Contract ID: {contractId}</p>
          <form onSubmit={handleSetMessage}>
            <input
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Set Message</button>
          </form>
          <button onClick={handleGetMessage}>Get Message</button>
          {retrievedMessage && <p>Retrieved Message: {retrievedMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default SmartContractInteraction;