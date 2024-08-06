const express = require('express');
const multer = require('multer');
const { FileCreateTransaction, FileContentsQuery } = require('@hashgraph/sdk');
const client = require('../services/hederaClient');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    const fileCreateTx = new FileCreateTransaction()
      .setContents(req.file.buffer)
      .setKeys([client.publicKey]);

    const submitTx = await fileCreateTx.execute(client);
    const receipt = await submitTx.getReceipt(client);
    const fileId = receipt.fileId;

    res.json({ fileId: fileId.toString() });
  } catch (error) {
    next(error);
  }
});

router.get('/:fileId', async (req, res, next) => {
  try {
    const fileContentsQuery = new FileContentsQuery()
      .setFileId(req.params.fileId);

    const contents = await fileContentsQuery.execute(client);
    res.send(contents);
  } catch (error) {
    next(error);
  }
});

module.exports = router;