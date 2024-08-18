const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fileStorageRoutes = require('./routes/fileStorage');
const tokenManagementRoutes = require('./routes/tokenManagement');
const consensusServiceRoutes = require('./routes/consensusService');
const smartContractRoutes = require('./routes/smartContract');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/api/file', fileStorageRoutes);
app.use('/api/token', tokenManagementRoutes);
app.use('/api/consensus', consensusServiceRoutes);
app.use('/api/smart-contract', smartContractRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));