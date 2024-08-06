const express = require('express');
const { TokenCreateTransaction, TokenType, TokenSupplyType, TokenMintTransaction } = require('@hashgraph/sdk');
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/mint', async (req, res, next) => {
  try {
    const { name, symbol, metadata } = req.body;

    // Create NFT token
    const createTokenTx = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(client.operatorAccountId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(1)
      .setSupplyKey(client.publicKey)
      .freezeWith(client);

    const createTokenRx = await (await createTokenTx.execute(client)).getReceipt(client);
    const tokenId = createTokenRx.tokenId;

    // Mint NFT
    const mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(metadata)])
      .freezeWith(client);

    const mintRx = await (await mintTx.execute(client)).getReceipt(client);

    res.json({ tokenId: tokenId.toString(), serialNumber: mintRx.serials[0].toString() });
  } catch (error) {
    next(error);
  }
});

module.exports = router;