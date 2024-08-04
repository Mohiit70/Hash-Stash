const { Client } = require("@hashgraph/sdk");
require('dotenv').config();

const client = Client.forTestnet();
client.setOperator(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);

module.exports = client;