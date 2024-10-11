'use client';

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
      const logoUrl = await fetch('/api/upload')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => data.url)
        .catch(() => {
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
