const express = require('express');
const { TokenCreateTransaction } = require("@hashgraph/sdk");
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, symbol, initialSupply } = req.body;
    const transaction = new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setInitialSupply(initialSupply)
      .setTreasuryAccountId(client.operatorAccountId);
    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const tokenId = receipt.tokenId;
    res.json({ tokenId: tokenId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;