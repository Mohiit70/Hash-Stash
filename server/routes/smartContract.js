const express = require('express');
const { ContractCreateTransaction, ContractExecuteTransaction, ContractFunctionParameters } = require('@hashgraph/sdk');

module.exports = (client) => {
  const router = express.Router();

  router.post('/deploy', async (req, res) => {
    try {
      const { bytecode } = req.body;
      const transaction = await new ContractCreateTransaction()
        .setBytecode(bytecode)
        .setGas(100000);

      const txResponse = await transaction.execute(client);
      const receipt = await txResponse.getReceipt(client);
      res.json({ contractId: receipt.contractId.toString() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/execute', async (req, res) => {
    try {
      const { contractId, functionName, params } = req.body;

      let functionParams = new ContractFunctionParameters();
      if (params && params.message) {
        functionParams.addString(params.message);
      }

      const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction(functionName, functionParams);

      const txResponse = await transaction.execute(client);
      const record = await txResponse.getRecord(client);

      res.json({ result: record.contractFunctionResult.getString(0) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};