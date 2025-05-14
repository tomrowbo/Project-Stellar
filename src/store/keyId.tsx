'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const KeyIdContext = createContext<{
  keyId: string | null;
  setKeyId: (keyId: string | null) => void;
}>({
  keyId: null,
  setKeyId: () => {},
});

export const KeyIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [keyId, setKeyId] = useState<string | null>(null);

  useEffect(() => {
    // Load from local storage on client side
    const storedKeyId = localStorage.getItem('stellar:keyId');
    if (storedKeyId) {
      setKeyId(storedKeyId);
    }
  }, []);

  return (
    <KeyIdContext.Provider value={{ keyId, setKeyId }}>
      {children}
    </KeyIdContext.Provider>
  );
};

export const useKeyId = () => useContext(KeyIdContext);

export default useKeyId; 