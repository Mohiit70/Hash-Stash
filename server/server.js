const express = require('express');
const cors = require('cors');
const { Client } = require('@hashgraph/sdk');
require('dotenv').config();

const app = express();

// Apply CORS middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Setup Hedera client
const client = Client.forTestnet();
client.setOperator(
  process.env.HEDERA_ACCOUNT_ID,
  process.env.HEDERA_PRIVATE_KEY
);

// Import and setup routes
const consensusRoutes = require('../server/routes/consensusService')(client);
const fileStorageRoutes = require('../server/routes/fileStorage')(client);
const smartContractRoutes = require('../server/routes/smartContract')(client);
const tokenManagementRoutes = require('../server/routes/tokenManagement')(client);

app.use('/api/consensus', consensusRoutes);
app.use('/api/file-storage', fileStorageRoutes);
app.use('/api/smart-contract', smartContractRoutes);
app.use('/api/token', tokenManagementRoutes);

// Serve static files from the "public" directory
app.use(express.static('public', { 
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  }
}));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
