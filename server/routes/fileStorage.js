const express = require('express');
const { FileCreateTransaction, FileContentsQuery } = require('@hashgraph/sdk');
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    const fileContents = req.files.file.data;
    const transaction = new FileCreateTransaction()
      .setContents(fileContents)
      .setKeys([client.publicKey])
      .freezeWith(client);

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    res.json({ fileId: receipt.fileId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const query = new FileContentsQuery()
      .setFileId(fileId);

    const contents = await query.execute(client);
    res.json({ contents: contents.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;