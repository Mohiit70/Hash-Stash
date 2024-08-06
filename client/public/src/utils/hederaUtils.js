import { TokenCreateTransaction, FileCreateTransaction, TopicCreateTransaction, ContractExecuteTransaction, TokenMintTransaction } from '@hashgraph/sdk';

export async function createToken(client, { name, symbol, initialSupply }) {
  const transaction = await new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setInitialSupply(initialSupply)
    .setTreasuryAccountId(client.operatorAccountId)
    .execute(client);

  const receipt = await transaction.getReceipt(client);
  return receipt.tokenId.toString();
}

export async function uploadFile(client, file) {
  const fileContents = await file.arrayBuffer();
  const transaction = await new FileCreateTransaction()
    .setContents(fileContents)
    .setKeys([client.publicKey])
    .execute(client);

  const receipt = await transaction.getReceipt(client);
  return receipt.fileId.toString();
}

export async function createTopic(client) {
  const transaction = await new TopicCreateTransaction().execute(client);
  const receipt = await transaction.getReceipt(client);
  return receipt.topicId.toString();
}

export async function executeContract(client, contractId, functionName, params) {
  const transaction = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setFunction(functionName, params)
    .execute(client);

  const record = await transaction.getRecord(client);
  return record.contractFunctionResult.toJson();
}

export async function mintNFT(client, { name, symbol, metadata }) {
  const transaction = await new TokenMintTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setMetadata([Buffer.from(metadata)])
    .execute(client);

  const receipt = await transaction.getReceipt(client);
  return receipt.tokenId.toString();
}