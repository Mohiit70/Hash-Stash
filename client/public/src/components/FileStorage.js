import React, { useState } from 'react';
import { useHederaClient } from '../hooks/useHederaClient';

function FileStorage() {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { client } = useHederaClient();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setResult('Please select a file first.');
      return;
    }

    setIsLoading(true);
    try {
      const fileCreateTx = await client.uploadFile(file);
      setResult(`File uploaded successfully. File ID: ${fileCreateTx.fileId}`);
    } catch (error) {
      setResult(`Error uploading file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileRetrieve = async () => {
    if (!fileId) {
      setResult('Please enter a File ID.');
      return;
    }

    setIsLoading(true);
    try {
      const fileContents = await client.downloadFile(fileId);
      setResult('File retrieved successfully.');
      // Handle file download here
      const blob = new Blob([fileContents], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-file';
      a.click();
    } catch (error) {
      setResult(`Error retrieving file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">File Storage</h2>
      <form onSubmit={handleFileUpload} className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <div className="mb-4">
        <input
          type="text"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
          placeholder="Enter File ID"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={handleFileRetrieve}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          disabled={isLoading}
        >
          {isLoading ? 'Retrieving...' : 'Retrieve'}
        </button>
      </div>
      <p className="text-gray-700">{result}</p>
    </div>
  );
}

export default FileStorage;