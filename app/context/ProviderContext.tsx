"use client";
import { Company } from "@/create/invoice/types";
import React, { createContext, useContext } from "react";

// Define the context type
interface ProviderContextType {
  provider: Company;
}

// Create the context
const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined,
);

// Create a custom hook to use the context
export const useProvider = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useProvider must be used within a ProviderContext");
  }
  return context;
};

// Create the provider component
export const ProviderContextProvider = ({
  children,
  provider,
}: {
  children: React.ReactNode;
  provider: Company;
}) => {
  return (
    <ProviderContext.Provider value={{ provider }}>
      {children}
    </ProviderContext.Provider>
  );
};
