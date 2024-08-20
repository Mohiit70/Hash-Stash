import React, { useState } from 'react';
import { useHederaContext } from '../contexts/HederaContext';
import { FileCreateTransaction, FileContentsQuery } from '@hashgraph/sdk';
import '../style/FileStorage.css';

function FileStorage() {
  const { client } = useHederaContext();
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file || !client) {
      setError('File or client is missing');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const transaction = await new FileCreateTransaction()
        .setContents(new Uint8Array(fileArrayBuffer))
        .setKeys([client.publicKey])
        .freezeWith(client);

      const signTx = await transaction.sign(client.operatorKey);
      const txResponse = await signTx.execute(client);
      const receipt = await txResponse.getReceipt(client);
      setFileId(receipt.fileId.toString());
    } catch (error) {
      setError('Error uploading file: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileRetrieval = async () => {
    if (!fileId || !client) {
      setError('File ID or client is missing');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const query = new FileContentsQuery().setFileId(fileId);
      const contents = await query.execute(client);
      setFileContents(new TextDecoder().decode(contents));
    } catch (error) {
      setError('Error retrieving file: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="file-storage">
      <h2 className="text-2xl font-bold mb-4 text-white">File Storage</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleFileUpload} className="mb-4">
        <div className="file-upload-container">
          <label htmlFor="fileInput" className="file-label">
            Choose File
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
            className="file-input"
          />
          <button
            type="submit"
            className="upload-button"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
      {fileId && (
        <div>
          <p className="text-white">File ID: {fileId}</p>
          <button
            onClick={handleFileRetrieval}
            className="upload-button mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Retrieving...' : 'Retrieve File'}
          </button>
        </div>
      )}
      {fileContents && (
        <p className="mt-4 bg-gray-700 p-4 rounded-lg text-white">
          {fileContents}
        </p>
      )}
    </div>
  );
}

export default FileStorage;