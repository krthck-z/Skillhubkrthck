/// <reference types="vite/client" />
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GoogleMapsContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isKeyConfigured: boolean;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'skillbridge_gmp_api_key';

export const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read from Vite environment variable or localStorage fallback
  const envKey =
    typeof import.meta !== 'undefined' && (import.meta as any).env
      ? ((import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY as string) || ''
      : '';
  const [apiKey, setApiKeyState] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(LOCAL_STORAGE_KEY) || envKey;
    }
    return envKey;
  });
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  useEffect(() => {
    if (envKey && !apiKey) {
      setApiKeyState(envKey);
    }
  }, [envKey, apiKey]);

  const setApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKeyState(trimmed);
    if (typeof window !== 'undefined' && window.localStorage) {
      if (trimmed) {
        localStorage.setItem(LOCAL_STORAGE_KEY, trimmed);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  };

  const isKeyConfigured = Boolean(apiKey && apiKey.length > 5);

  return (
    <GoogleMapsContext.Provider
      value={{
        apiKey,
        setApiKey,
        isKeyConfigured,
        isConfigModalOpen,
        setIsConfigModalOpen
      }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = (): GoogleMapsContextType => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
};
