const express = require('express');
const { FileCreateTransaction, FileContentsQuery } = require('@hashgraph/sdk');

module.exports = (client) => {
  const router = express.Router();

  router.post('/upload', async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      const file = req.files.file;
      const fileContents = file.data;

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

      const query = new FileContentsQuery().setFileId(fileId);
      const contents = await query.execute(client);

      res.set('Content-Type', 'application/octet-stream');
      res.send(Buffer.from(contents));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};