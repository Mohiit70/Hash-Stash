const express = require('express');
const multer = require('multer');
const { FileCreateTransaction, FileContentsQuery } = require("@hashgraph/sdk");
const client = require('../services/hederaClient');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileCreateTx = new FileCreateTransaction()
      .setContents(req.file.buffer)
      .setKeys([client.publicKey])
      .freezeWith(client);
    const fileCreateSubmit = await fileCreateTx.execute(client);
    const fileCreateRx = await fileCreateSubmit.getReceipt(client);
    const fileId = fileCreateRx.fileId;
    res.json({ fileId: fileId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:fileId', async (req, res) => {
  try {
    const fileContentsQuery = new FileContentsQuery()
      .setFileId(req.params.fileId);
    const contents = await fileContentsQuery.execute(client);
    res.send(contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;