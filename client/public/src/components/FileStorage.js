import React, { useState } from 'react';
import axios from 'axios';

function FileStorage() {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState('');
  const [result, setResult] = useState('');

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/file/upload', formData);
      setResult(`File uploaded successfully. File ID: ${response.data.fileId}`);
    } catch (error) {
      setResult(`Error uploading file: ${error.message}`);
    }
  };

  const handleFileRetrieve = async () => {
    if (!fileId) return;

    try {
      const response = await axios.get(`/api/file/${fileId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'retrieved-file');
      document.body.appendChild(link);
      link.click();
      setResult('File retrieved successfully.');
    } catch (error) {
      setResult(`Error retrieving file: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>File Storage</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <div>
        <input
          type="text"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
          placeholder="Enter File ID"
        />
        <button onClick={handleFileRetrieve}>Retrieve</button>
      </div>
      <p>{result}</p>
    </div>
  );
}

export default FileStorage;