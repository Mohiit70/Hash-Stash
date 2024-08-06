const express = require('express');
const dotenv = require('dotenv');
const fileStorageRoutes = require('./routes/fileStorage');
const tokenManagementRoutes = require('./routes/tokenManagement');
const consensusServiceRoutes = require('./routes/consensusService');
const smartContractRoutes = require('./routes/smartContract');
const nftMintingRoutes = require('./routes/nftMinting');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/file', fileStorageRoutes);
app.use('/api/token', tokenManagementRoutes);
app.use('/api/consensus', consensusServiceRoutes);
app.use('/api/smart-contract', smartContractRoutes);
app.use('/api/nft', nftMintingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));