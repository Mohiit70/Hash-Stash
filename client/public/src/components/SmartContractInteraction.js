import React, { useState } from 'react';
import { useHederaClient } from '../hooks/useHederaClient';

function SmartContractInteraction() {
  const [contractId, setContractId] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [parameters, setParameters] = useState('');
  const [result, setResult] = useState('');
  const { client } = useHederaClient();

  const handleExecute = async (e) => {
    e.preventDefault();
    try {
      const response = await client.executeContract(contractId, functionName, JSON.parse(parameters));
      setResult(`Contract executed successfully. Result: ${JSON.stringify(response)}`);
    } catch (error) {
      setResult(`Error executing contract: ${error.message}`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Smart Contract Interaction</h2>
      <form onSubmit={handleExecute}>
        <input
          type="text"
          value={contractId}
          onChange={(e) => setContractId(e.target.value)}
          placeholder="Contract ID"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <input
          type="text"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
          placeholder="Function Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <textarea
          value={parameters}
          onChange={(e) => setParameters(e.target.value)}
          placeholder="Parameters (JSON format)"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Execute Contract
        </button>
      </form>
      <p className="text-gray-700 mt-4">{result}</p>
    </div>
  );
}

export default SmartContractInteraction;