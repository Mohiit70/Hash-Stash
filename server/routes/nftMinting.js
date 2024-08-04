const express = require('express');
const { TokenCreateTransaction, TokenType, TokenSupplyType } = require("@hashgraph/sdk");
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/mint', async (req, res) => {
  try {
    const { name, symbol, metadata } = req.body;

    const transaction = new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTokenType(TokenType.NonFungibleUnique)
      .setSupplyType(TokenSupplyType.Finite)
      .setInitialSupply(1)
      .setMaxSupply(1)
      .setTreasuryAccountId(client.operatorAccountId)
      .setAdminKey(client.publicKey)
      .setSupplyKey(client.publicKey)
      .setTokenMemo(metadata);

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const tokenId = receipt.tokenId;

    res.json({ tokenId: tokenId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;