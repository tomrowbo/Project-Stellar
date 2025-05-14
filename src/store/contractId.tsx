'use client';

import { useState, createContext, useContext } from 'react';

const ContractIdContext = createContext<{
  contractId: string | null;
  setContractId: (contractId: string | null) => void;
}>({
  contractId: null,
  setContractId: () => {},
});

export const ContractIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [contractId, setContractId] = useState<string | null>(null);

  return (
    <ContractIdContext.Provider value={{ contractId, setContractId }}>
      {children}
    </ContractIdContext.Provider>
  );
};

export const useContractId = () => useContext(ContractIdContext);

export default useContractId; 