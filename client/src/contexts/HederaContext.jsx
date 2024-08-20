import React, { createContext, useState, useEffect } from 'react';
import { Client, PrivateKey } from "@hashgraph/sdk";

export const HederaContext = createContext();

export const HederaProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initClient = async () => {
      if (!import.meta.env.VITE_HEDERA_ACCOUNT_ID || !import.meta.env.VITE_HEDERA_PRIVATE_KEY) {
        console.error("Environment variables for Hedera are not set");
        return;
      }

      const accountId = import.meta.env.VITE_HEDERA_ACCOUNT_ID;
      const privateKey = PrivateKey.fromString(import.meta.env.VITE_HEDERA_PRIVATE_KEY);

      const newClient = Client.forTestnet();
      newClient.setOperator(accountId, privateKey);

      setClient(newClient);
    };

    initClient();
  }, []);

  return (
    <HederaContext.Provider value={{ client }}>
      {children}
    </HederaContext.Provider>
  );
};

export const useHederaContext = () => React.useContext(HederaContext);