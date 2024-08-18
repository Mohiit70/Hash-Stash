const express = require('express');
const { TopicCreateTransaction, TopicMessageSubmitTransaction } = require('@hashgraph/sdk');
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/create-topic', async (req, res) => {
  try {
    const transaction = await new TopicCreateTransaction().freezeWith(client);
    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    res.json({ topicId: receipt.topicId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/submit-message', async (req, res) => {
  try {
    const { topicId, message } = req.body;
    const transaction = await new TopicMessageSubmitTransaction({
      topicId,
      message,
    }).freezeWith(client);

    const txResponse = await transaction.execute(client);
    await txResponse.getReceipt(client);
    res.json({ success: true, message: 'Message submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;