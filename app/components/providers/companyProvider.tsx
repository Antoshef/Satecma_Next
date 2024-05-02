"use client";
import { Company } from "@/create/invoice/constants";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface CompanyContextType {
  company?: Company;
  setCompany: Dispatch<SetStateAction<Company>>;
}

export const CompanyContext = createContext<CompanyContextType>({
  company: undefined,
  setCompany: () => {},
});

export default function CompanyProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [company, setCompany] = useState<Company>(
    (localStorage?.getItem("company") as Company) || undefined
  );

  useEffect(() => {
    const saved = localStorage?.getItem("company");
    setCompany(JSON.parse(saved || JSON.stringify(Company.satecma)));
  }, [localStorage]);

  return (
    <main>
      <CompanyContext.Provider value={{ company, setCompany }}>
        {children}
      </CompanyContext.Provider>
    </main>
  );
}
