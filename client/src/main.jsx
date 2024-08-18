import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HederaProvider } from './contexts/HederaContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HederaProvider>
      <App />
    </HederaProvider>
  </React.StrictMode>
);