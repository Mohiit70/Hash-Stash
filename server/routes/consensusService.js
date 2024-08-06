const express = require('express');
const { TopicCreateTransaction, TopicMessageSubmitTransaction } = require('@hashgraph/sdk');
const client = require('../services/hederaClient');

const router = express.Router();

router.post('/create-topic', async (req, res, next) => {
  try {
    const transaction = await new TopicCreateTransaction().execute(client);
    const receipt = await transaction.getReceipt(client);
    const topicId = receipt.topicId;
    res.json({ topicId: topicId.toString() });
  } catch (error) {
    next(error);
  }
});

router.post('/submit-message', async (req, res, next) => {
  try {
    const { topicId, message } = req.body;
    const transaction = await new TopicMessageSubmitTransaction({
      topicId,
      message,
    }).execute(client);

    const receipt = await transaction.getReceipt(client);
    res.json({ 
      sequenceNumber: receipt.topicSequenceNumber.toString(),
      topicId: topicId.toString()
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;