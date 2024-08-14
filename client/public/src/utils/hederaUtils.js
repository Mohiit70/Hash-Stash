import { TokenCreateTransaction, FileCreateTransaction, TopicCreateTransaction, ContractExecuteTransaction, TokenMintTransaction } from '@hashgraph/sdk';

export async function createToken(client, { name, symbol, initialSupply }) {
  try {
    const transaction = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setInitialSupply(initialSupply)
      .setTreasuryAccountId(client.operatorAccountId)
      .execute(client);

    const receipt = await transaction.getReceipt(client);
    return receipt.tokenId.toString();
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
}

export async function uploadFile(client, file) {
  try {
    const fileContents = await file.arrayBuffer();
    const transaction = await new FileCreateTransaction()
      .setContents(fileContents)
      .setKeys([client.publicKey])
      .execute(client);

    const receipt = await transaction.getReceipt(client);
    return receipt.fileId.toString();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function createTopic(client) {
  try {
    const transaction = await new TopicCreateTransaction().execute(client);
    const receipt = await transaction.getReceipt(client);
    return receipt.topicId.toString();
  } catch (error) {
    console.error('Error creating topic:', error);
    throw error;
  }
}

export async function executeContract(client, contractId, functionName, params) {
  try {
    const transaction = await new ContractExecuteTransaction()
      .setContractId(contractId)
      .setFunction(functionName, params)
      .execute(client);

    const record = await transaction.getRecord(client);
    return record.contractFunctionResult.toJson();
  } catch (error) {
    console.error('Error executing contract:', error);
    throw error;
  }
}

export async function mintNFT(client, { name, symbol, metadata }) {
  try {
    const transaction = await new TokenMintTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setMetadata([Buffer.from(metadata)])
      .execute(client);

    const receipt = await transaction.getReceipt(client);
    return receipt.tokenId.toString();
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}