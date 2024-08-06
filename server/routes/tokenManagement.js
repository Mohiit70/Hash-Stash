const express = require('express');
const { TokenCreateTransaction, TokenType, TokenSupplyType } = require('@hashgraph/sdk');
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/create', async (req, res, next) => {
  try {
    const { name, symbol, initialSupply } = req.body;

    const transaction = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(0)
      .setInitialSupply(initialSupply)
      .setTreasuryAccountId(client.operatorAccountId)
      .setSupplyType(TokenSupplyType.Infinite)
      .setSupplyKey(client.publicKey)
      .freezeWith(client);

    const signTx = await transaction.sign(client.privateKey);
    const txResponse = await signTx.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const tokenId = receipt.tokenId;

    res.json({ tokenId: tokenId.toString() });
  } catch (error) {
    next(error);
  }
});

module.exports = router;