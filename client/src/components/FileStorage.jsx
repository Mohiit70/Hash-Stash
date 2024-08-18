import React, { useState } from 'react';
import { useHederaContext } from '../hooks/useHederaClient';
import { FileCreateTransaction, FileContentsQuery } from '@hashgraph/sdk';

function FileStorage() {
  const { client } = useHederaContext();
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState('');
  const [fileContents, setFileContents] = useState('');

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file || !client) return;

    try {
      const fileContents = await file.arrayBuffer();
      const transaction = new FileCreateTransaction()
        .setContents(new Uint8Array(fileContents))
        .setKeys([client.publicKey])
        .freezeWith(client);

      const txResponse = await transaction.execute(client);
      const receipt = await txResponse.getReceipt(client);
      setFileId(receipt.fileId.toString());
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileRetrieval = async () => {
    if (!fileId || !client) return;

    try {
      const query = new FileContentsQuery()
        .setFileId(fileId);

      const contents = await query.execute(client);
      setFileContents(new TextDecoder().decode(contents));
    } catch (error) {
      console.error('Error retrieving file:', error);
    }
  };

  return (
    <div>
      <h2>File Storage</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {fileId && (
        <div>
          <p>File ID: {fileId}</p>
          <button onClick={handleFileRetrieval}>Retrieve File</button>
        </div>
      )}
      {fileContents && <p>File Contents: {fileContents}</p>}
    </div>
  );
}

export default FileStorage;