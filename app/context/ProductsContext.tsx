"use client";
import { Product } from "@/create/invoice/types";
import React, { createContext, useContext } from "react";

// Define the context type
interface ProductsContextType {
  products: Product[];
}

// Create the context
const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

// Create a custom hook to use the context
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsContext");
  }
  return context;
};

// Create the provider component
export const ProductsContextProvider = ({
  children,
  products,
}: {
  children: React.ReactNode;
  products: Product[];
}) => {
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
