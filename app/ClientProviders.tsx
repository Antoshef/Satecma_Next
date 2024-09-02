"use client";

import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "./components/header";
import { createContext, useState } from "react";
import { Company } from "./create/invoice/constants";

const inter = Inter({ subsets: ["latin"] });

interface ICompanyContext {
  company: Company;
  setCompany: (company: Company) => void;
}

export const CompanyContext = createContext<ICompanyContext>({
  company: Company.satecma,
  setCompany: () => {},
});

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [company, setCompany] = useState<Company>(Company.satecma);

  return (
    <UserProvider>
      <CompanyContext.Provider value={{ company, setCompany }}>
        <Header />
        <div className={inter.className}>{children}</div>
      </CompanyContext.Provider>
    </UserProvider>
  );
}
