const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { Client } = require('@hashgraph/sdk');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const client = Client.forTestnet();
client.setOperator(
  process.env.HEDERA_ACCOUNT_ID,
  process.env.HEDERA_PRIVATE_KEY
);

const fileStorageRoutes = require('./routes/fileStorage');
const tokenManagementRoutes = require('./routes/tokenManagement');
const consensusServiceRoutes = require('./routes/consensusService');
const smartContractRoutes = require('./routes/smartContract');

app.use('/api/file', fileStorageRoutes(client));
app.use('/api/token', tokenManagementRoutes(client));
app.use('/api/consensus', consensusServiceRoutes(client));
app.use('/api/smart-contract', smartContractRoutes(client));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));