const express = require('express');
const { Client, FileCreateTransaction, FileContentsQuery } = require('@hashgraph/sdk');
const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    const { fileContents } = req.body;
    const client = Client.forTestnet();
    client.setOperator(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);

    const transaction = new FileCreateTransaction()
      .setContents(fileContents)
      .setKeys([client.publicKey])
      .freezeWith(client);

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const fileId = receipt.fileId;

    res.json({ fileId: fileId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const client = Client.forTestnet();
    client.setOperator(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);

    const query = new FileContentsQuery()
      .setFileId(fileId);

    const contents = await query.execute(client);

    res.json({ contents: contents.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;