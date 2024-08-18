import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '@hashgraph/sdk';

const HederaContext = createContext();

export function HederaProvider({ children }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initClient = async () => {
      try {
        const newClient = Client.forTestnet();
        newClient.setOperator(
          import.meta.env.VITE_HEDERA_ACCOUNT_ID,
          import.meta.env.VITE_HEDERA_PRIVATE_KEY
        );
        setClient(newClient);
      } catch (error) {
        console.error('Error initializing Hedera client:', error);
      }
    };

    initClient();
  }, []);

  return (
    <HederaContext.Provider value={{ client }}>
      {children}
    </HederaContext.Provider>
  );
}

export function useHederaContext() {
  return useContext(HederaContext);
}