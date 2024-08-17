const { Client } = require('@hashgraph/sdk');
require('dotenv').config();

const accountId = process.env.HEDERA_ACCOUNT_ID;
const privateKey = process.env.HEDERA_PRIVATE_KEY;

if (accountId == null || privateKey == null) {
  throw new Error("Environment variables HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY must be present");
}

const client = Client.forTestnet();
client.setOperator(accountId, privateKey);

module.exports = client;