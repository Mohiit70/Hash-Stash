const express = require('express');
const { FileCreateTransaction, FileContentsQuery } = require('@hashgraph/sdk');
const client = require('../services/hederaClient');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileContents = req.file.buffer;

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

    const query = new FileContentsQuery()
      .setFileId(fileId);

    const contents = await query.execute(client);

    res.json({ contents: contents.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;