"use client";
import { IInvoiceIds } from "@/create/invoice/types";
import React, { createContext, useContext } from "react";

// Define the context type
interface InvoiceIdsContextType {
  invoiceIds: IInvoiceIds;
}

// Create the context
const InvoiceIdsContext = createContext<InvoiceIdsContextType | undefined>(
  undefined,
);

// Create a custom hook to use the context
export const useInvoiceIds = () => {
  const context = useContext(InvoiceIdsContext);
  if (!context) {
    throw new Error("useInvoiceIds must be used within a InvoiceIdsContext");
  }
  return context;
};

// Create the provider component
export const InvoiceIdsContextProvider = ({
  children,
  invoiceIds,
}: {
  children: React.ReactNode;
  invoiceIds: IInvoiceIds;
}) => {
  return (
    <InvoiceIdsContext.Provider value={{ invoiceIds }}>
      {children}
    </InvoiceIdsContext.Provider>
  );
};
