const express = require('express');
const { ContractExecuteTransaction, ContractFunctionParameters } = require("@hashgraph/sdk");
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/transfer', async (req, res) => {
  try {
    const { recipient, amount } = req.body;
    const contractId = process.env.TOKEN_CONTRACT_ID;

    const transaction = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(100000)
      .setFunction("transfer", new ContractFunctionParameters()
        .addAddress(recipient)
        .addUint256(amount));

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    res.json({ transactionId: txResponse.transactionId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
