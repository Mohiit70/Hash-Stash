const express = require('express');
const { TokenCreateTransaction, TokenInfoQuery } = require('@hashgraph/sdk');
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, symbol } = req.body;
    const transaction = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setDecimals(0)
      .setInitialSupply(1000)
      .setTreasuryAccountId(client.operatorAccountId)
      .freezeWith(client);

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    res.json({ tokenId: receipt.tokenId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;
    const query = new TokenInfoQuery().setTokenId(tokenId);

    const tokenInfo = await query.execute(client);
    res.json(tokenInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;