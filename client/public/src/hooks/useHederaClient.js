import { useContext } from 'react';
import { HederaContext } from '../contexts/HederaContext';

export function useHederaClient() {
  const context = useContext(HederaContext);
  if (context === undefined) {
    throw new Error('useHederaClient must be used within a HederaProvider');
  }
  return context;
}