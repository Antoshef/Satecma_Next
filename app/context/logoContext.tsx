'use client';

import { baseUrl } from '@/constants';
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';

interface LogoContextProps {
  logoUrl: string | null;
  setLogoUrl: (url: string) => void;
}

const LogoContext = createContext<LogoContextProps | undefined>(undefined);

const LogoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      const logoUrl = await fetch(`${baseUrl}/api/upload`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => data.url)
        .catch((error) => {
          console.error('Error fetching logo:', error);
          return null;
        });
      setLogoUrl(logoUrl);
    };

    fetchLogo();
  }, []);

  return (
    <LogoContext.Provider value={{ logoUrl, setLogoUrl }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = (): LogoContextProps => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};

export default LogoProvider;
