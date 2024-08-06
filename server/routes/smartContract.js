const express = require('express');
const { ContractExecuteTransaction, ContractFunctionParameters } = require('@hashgraph/sdk');
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/execute', async (req, res, next) => {
  try {
    const { contractId, functionName, params } = req.body;

    const transaction = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(100000)
      .setFunction(functionName, new ContractFunctionParameters().addString(params));

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    res.json({ result: receipt.status.toString() });
  } catch (error) {
    next(error);
  }
});

module.exports = router;