import React, { useState } from 'react';
import { useHederaContext } from '../contexts/HederaContext';

function FileStorage() {
  const { client } = useHederaContext();
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file || !client) return;

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const transaction = new FileCreateTransaction()
        .setContents(new Uint8Array(fileArrayBuffer))
        .setKeys([client.publicKey])
        .freezeWith(client);

      const txResponse = await transaction.execute(client);
      const receipt = await txResponse.getReceipt(client);
      setFileId(receipt.fileId.toString());
    } catch (error) {
      setError('Error uploading file');
      console.error('Error uploading file:', error);
    }
  };

  const handleFileRetrieval = async () => {
    if (!fileId || !client) return;

    try {
      const query = new FileContentsQuery().setFileId(fileId);
      const contents = await query.execute(client);
      setFileContents(new TextDecoder().decode(contents));
    } catch (error) {
      setError('Error retrieving file');
      console.error('Error retrieving file:', error);
    }
  };

  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg text-textLight">
      <h2 className="text-2xl font-bold mb-4">File Storage</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleFileUpload} className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2 p-2 border rounded bg-secondary text-textLight"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>
      {fileId && (
        <div>
          <p>File ID: {fileId}</p>
          <button
            onClick={handleFileRetrieval}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Retrieve File
          </button>
        </div>
      )}
      {fileContents && <p className="mt-4 bg-secondary p-4 rounded-lg">{fileContents}</p>}
    </div>
  );
}

export default FileStorage;