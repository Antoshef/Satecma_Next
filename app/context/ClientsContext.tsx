"use client";
import { Client } from "@/clients/utils/types";
import React, { createContext, useContext } from "react";

// Define the context type
interface ClientsContextType {
  clients: Client[];
}

// Create the context
const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useClients = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientsContext");
  }
  return context;
};

// Create the provider component
export const ClientsContextProvider = ({
  children,
  clients,
}: {
  children: React.ReactNode;
  clients: Client[];
}) => {
  return (
    <ClientsContext.Provider value={{ clients }}>
      {children}
    </ClientsContext.Provider>
  );
};
