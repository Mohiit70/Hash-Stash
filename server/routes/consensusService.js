const express = require('express');
const {
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  TopicMessageQuery,
  Client,
  PrivateKey
} = require("@hashgraph/sdk");
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const client = Client.forTestnet();
client.setOperator(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);

let topicId;

async function createTopic() {
  const transaction = await new TopicCreateTransaction().execute(client);
  const receipt = await transaction.getReceipt(client);
  topicId = receipt.topicId;
  console.log(`Created topic with ID: ${topicId}`);
}

createTopic().catch(console.error);

router.post('/submit', async (req, res) => {
  try {
    if (!topicId) {
      throw new Error("Topic not created yet");
    }

    const message = req.body.message;
    const transaction = await new TopicMessageSubmitTransaction({
      topicId: topicId,
      message: message,
    }).execute(client);

    const receipt = await transaction.getReceipt(client);
    res.json({ 
      sequenceNumber: receipt.topicSequenceNumber.toString(),
      topicId: topicId.toString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/subscribe', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const sendMessage = (message) => {
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  };

  if (!topicId) {
    sendMessage({ error: "Topic not created yet" });
    return;
  }

  new TopicMessageQuery()
    .setTopicId(topicId)
    .subscribe(
      client,
      (message) => {
        const messageAsString = Buffer.from(message.contents).toString();
        sendMessage({ 
          content: messageAsString,
          sequenceNumber: message.sequenceNumber.toString(),
          timestamp: message.consensusTimestamp.toDate().toISOString()
        });
      },
      (error) => {
        console.error("Error in subscription:", error);
        sendMessage({ error: "Subscription error occurred" });
      }
    );

  const keepAlive = setInterval(() => {
    sendMessage({ type: "keepalive" });
  }, 15000);

  req.on('close', () => {
    clearInterval(keepAlive);
  });
});

module.exports = router;