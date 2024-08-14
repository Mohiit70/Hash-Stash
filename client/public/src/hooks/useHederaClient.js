import { useContext, useEffect, useState } from 'react';
import { HederaContext } from '../contexts/HederaContext';
import { Client } from '@hashgraph/sdk';

export function useHederaClient() {
  const context = useContext(HederaContext);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (context === undefined) {
      throw new Error('useHederaClient must be used within a HederaProvider');
    }

    const initClient = async () => {
      try {
        const newClient = Client.forTestnet();
        newClient.setOperator(process.env.REACT_APP_HEDERA_ACCOUNT_ID, process.env.REACT_APP_HEDERA_PRIVATE_KEY);
        setClient(newClient);
      } catch (error) {
        console.error('Error initializing Hedera client:', error);
      }
    };

    initClient();
  }, [context]);

  return { client };
}